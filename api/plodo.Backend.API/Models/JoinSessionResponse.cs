using System;
using System.Collections.Generic;
using plodo.Backend.API.Validation;

namespace plodo.Backend.API.Models
{
    public class JoinSessionResponse
    {
        /// <summary>
        /// The options allowed in this session.
        /// Options are represented as Unicode emoji characters
        /// </summary>
        [MultiVoteOptionValidator]
        public IEnumerable<string> VotingOptions { get; set; }

        /// <summary>
        /// The provided ID of the user connected
        /// </summary>
        public Guid UserId { get; set; }
        
        /// <summary>
        /// Access token to be used in all subsequent requests. Should be placed in the Authorization header
        /// </summary>
        public AccessToken AccessToken { get; set; }
    }
}