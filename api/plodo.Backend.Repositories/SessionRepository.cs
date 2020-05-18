using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Cassandra;
using Cassandra.Mapping;
using plodo.Backend.Repositories.Model;

namespace plodo.Backend.Repositories
{
    public class SessionRepository : RepositoryBase, ISessionRepository
    {
        public SessionRepository(ISession session) : base(session)
        {
        }

        public async Task<bool> StoreSession(Model.Session session)
        {
            var x = await Mapper.InsertIfNotExistsAsync(session);
            return x.Applied;
        }

        public async Task DestroySession(string sessionId)
        {
            //This should be batched when CosmosDB supports delete in batches
            
            await Mapper.DeleteAsync<Model.Session>("WHERE sessionId = ?", sessionId);
            await Mapper.DeleteAsync<Model.SessionAudience>("WHERE sessionId = ?", sessionId);
            await Mapper.DeleteAsync<Model.SessionVote>("WHERE sessionId = ?", sessionId);
        }

        public async Task<Model.Session> FetchSession(string sessionId)
        {
            return await Mapper.SingleOrDefaultAsync<Model.Session>("WHERE sessionId = ?", sessionId);
        }

        public async Task<IPage<Model.SessionVote>> FetchVotes(string sessionId, int pageSize = 1000,
            byte[] pagingState = null)
        {
            return await Mapper.FetchPageAsync<Model.SessionVote>(pageSize, pagingState, "WHERE sessionId = ?",
                new[] {sessionId});
        }

        public async Task<IEnumerable<SessionAudience>> FetchAudience(string sessionId)
        {
            return await Mapper.FetchAsync<Model.SessionAudience>("WHERE sessionId = ?", sessionId);
        }

        public async Task AddAudience(string sessionId, Guid audienceId)
        {
            await Mapper.InsertAsync(new SessionAudience {SessionId = sessionId, AudienceId = audienceId});
        }

        public async Task AddVote(string sessionId, Guid audienceId, string vote)
        {
            await Mapper.InsertAsync(new SessionVote {Id = Guid.NewGuid(), SessionId = sessionId, AudienceId = audienceId, Vote = vote});
        }

        public async Task<bool> IsInSession(string sessionId, Guid audienceId)
        {
            var audience = await Mapper.SingleOrDefaultAsync<SessionAudience>("WHERE sessionId = ? AND audienceId = ?", sessionId,
                audienceId);

            return audience != null;
        }
    }
}