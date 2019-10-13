using System.Collections.Generic;

namespace plodo.Backend.API.Models
{
    public class CreateSessionRequest
    {
        public IEnumerable<Vote> VotingOptions { get; set; }
    }
}