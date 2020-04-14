using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cassandra.Mapping;
using plodo.Backend.Repositories.Model;

namespace plodo.Backend.Repositories
{
    public interface ISessionRepository
    {
        Task<bool> StoreSession(Model.Session session);
        Task DestroySession(string sessionId);
        Task<Model.Session> FetchSession(string sessionId);

        Task<IPage<Model.SessionVote>> FetchVotes(string sessionId, int pageSize = 1000,
            byte[] pagingState = null);

        Task<IEnumerable<SessionAudience>> FetchAudience(string sessionId);
        Task AddAudience(string sessionId, Guid audienceId);
        Task AddVote(string sessionId, Guid audienceId, string vote);
        Task<bool> IsInSession(string sessionId, Guid audienceId);
    }
}