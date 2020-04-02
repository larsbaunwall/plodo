using System.Collections.Generic;
using plodo.Backend.API.Validation;

namespace plodo.Backend.API.Models
{
    public class JoinSessionResponse
    {
        [MultiVoteOptionValidator]
        public IEnumerable<string> VotingOptions { get; set; }
        public AccessToken AccessToken { get; set; }
    }
}