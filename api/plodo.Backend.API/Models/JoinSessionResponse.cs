using System.Collections.Generic;

namespace plodo.Backend.API.Models
{
    public class JoinSessionResponse
    {
        public IEnumerable<Vote> VotingOptions { get; set; }
        public AccessToken Token { get; set; }
    }
}