using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using plodo.Backend.Repositories;
using plodo.Backend.Services.Exceptions;
using plodo.Backend.Services.Models;

namespace plodo.Backend.Services
{
    public class SessionService : ISessionService
    {
        private readonly ISessionRepository _sessionRepo;
        private readonly ISecurityTokenService _sts;
        private readonly string _idAlphabet = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        public SessionService(ISessionRepository sessionRepo, ISecurityTokenService sts)
        {
            _sessionRepo = sessionRepo;
            _sts = sts;
        }

        public async Task<(string SessionId, SerializedSecurityToken Token)> CreateSession(Guid hostId, IEnumerable<Session.VoteOption> voteOptions)
        {
            var id = await GenerateId();
            var success = await _sessionRepo.StoreSession(
                new Repositories.Model.Session
                {
                    Id = id, 
                    HostId = hostId, 
                    VotingOptions = voteOptions.Select(x => x.Icon)
                });
            
            if(!success)
                throw new Exception("Could not create a new session. Please try again.");

            return (SessionId: id, Token: _sts.IssueToken(id, hostId, new[] {"Host"}));
        }

        public async Task DestroySession(string sessionId)
        {
            await _sessionRepo.DestroySession(sessionId);
        }

        public async Task<Session> GetSession(string sessionId)
        {
            var session = await _sessionRepo.FetchSession(sessionId);
            
            return new Session(session.Id, session.HostId, session.VotingOptions.Select(x => new Session.VoteOption(x)));
        }

        public async Task<(Session Session, SerializedSecurityToken Token)> JoinSession(string sessionId, Guid audienceId)
        {
            var session = await GetSession(sessionId);
            
            if(session == null)
                throw new SessionNotFoundException();

            await _sessionRepo.AddAudience(sessionId, audienceId);
            
            return (Session: session, Token: _sts.IssueToken(sessionId, audienceId, new []{"Audience"}));
        }

        public async Task RecordVote(string sessionId, Guid audienceId, string vote)
        {
            var session = await GetSession(sessionId);
            
            if(session == null)
                throw new SessionNotFoundException();

            var inSession = await _sessionRepo.IsInSession(sessionId, audienceId);
            
            if(!inSession)
                throw new AudienceNotInSessionException();

            await _sessionRepo.AddVote(sessionId, audienceId, vote);
        }

        private async Task<string> GenerateId()
        {
            var id = await Nanoid.Nanoid.GenerateAsync(_idAlphabet, 6);
            return $"{id.Substring(0, 3)}-{id.Substring(3, 3)}";
        }
    }
}