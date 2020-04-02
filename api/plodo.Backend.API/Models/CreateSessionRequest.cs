using System.Collections.Generic;
using plodo.Backend.API.Validation;

namespace plodo.Backend.API.Models
{
    public class CreateSessionRequest
    {
        /// <summary>
        /// A list of valid votes. Votes must be in the format of a-z, A-Z and hyphens
        /// </summary>
        [MultiVoteOptionValidator]
        public IEnumerable<string> VotingOptions { get; set; }
    }
}