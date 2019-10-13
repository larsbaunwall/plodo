using System.Collections.Generic;

namespace plodo.Backend.Services.Models
{
    public class Session
    {
        public List<VoteOption> VotingOptions { get; set; }
        
        public class VoteOption
        {
            public string Name { get; set; }
            public string Icon { get; set; }
        }
    }

}