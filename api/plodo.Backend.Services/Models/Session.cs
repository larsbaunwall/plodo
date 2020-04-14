using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace plodo.Backend.Services.Models
{
    public class Session
    {
        public string SessionId { get; }
        public Guid OwnerId { get; }
        
        public List<VoteOption> VotingOptions { get; }

        public Session(string sessionId, Guid ownerId, IEnumerable<VoteOption> votingOptions)
        {
            SessionId = sessionId;
            OwnerId = ownerId;
            VotingOptions = votingOptions.ToList();
        }
        
        public class VoteOption
        {
            public string Name { get; }
            public string Icon { get; }

            public VoteOption(string icon, string name = null)
            {
                if(!Regex.IsMatch(icon, @"^[^\u0000-\u007F]+$"))
                    throw new ArgumentException("name contains invalid characters", nameof(icon));

                Icon = icon;
                Name = name;
            }
        }
    }

}