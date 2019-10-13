using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using plodo.Backend.Services.Models;

namespace plodo.Backend.Services
{
    public interface ISessionService
    {
        string CreateSession(Session session, int maxRetries = 5);
        void DestroySession(string sessionId);
        Session GetSession(string sessionId);
    }

    public class SessionService : ISessionService
    {
        private readonly object _sessionsLock = new object();
        private static ConcurrentDictionary<string, Session> _sessions;
        
        public SessionService()
        {
            var allCombinations = GetCombinations("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray(), 4);
            _sessions = new ConcurrentDictionary<string, Session>(allCombinations.Select(x => new KeyValuePair<string, Session>(string.Concat(x), null)));
        }
        
        private IEnumerable<IEnumerable<T>> GetCombinations<T>(IList<T> list, int length)
        {
            if (length == 1) return list.Select(t => new T[] { t });

            return GetCombinations(list, length - 1)
                .SelectMany(t => list, (t1, t2) => t1.Concat(new T[] { t2 }));
        }

        public string CreateSession(Session session, int maxRetries = 5)
        {
            var count = 0;
            while (count < maxRetries)
            {
                count += 1;
                
                lock (_sessionsLock)
                {
                    var rnd = new Random();
                    var (candidateKey, _) = _sessions.ToArray().Where(x => x.Value == null).ElementAtOrDefault(rnd.Next(0, _sessions.Count - 1));

                    _sessions[candidateKey] = session;

                    return candidateKey;
                }
            }

            throw new Exception("Could not create a new session ID in the specified number of attempts. Please try again.");
        }

        public void DestroySession(string sessionId)
        {
            lock (_sessionsLock)
            {
                _sessions[sessionId] = null;
            }
        }

        public Session GetSession(string sessionId)
        {
            lock (_sessionsLock)
            {
                return _sessions[sessionId];
            }
        }
    }
}