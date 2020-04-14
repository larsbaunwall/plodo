using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using plodo.Backend.Services.Models;

namespace plodo.Backend.Services
{
    public interface ISessionService
    {
        Task<(string SessionId, SerializedSecurityToken Token)> CreateSession(Guid hostId, IEnumerable<Session.VoteOption> voteOptions);
        Task DestroySession(string sessionId);
        Task<Session> GetSession(string sessionId);
        Task<(Session Session, SerializedSecurityToken Token)> JoinSession(string sessionId, Guid audienceId);
        Task RecordVote(string sessionId, Guid audienceId, string vote);
    }
}