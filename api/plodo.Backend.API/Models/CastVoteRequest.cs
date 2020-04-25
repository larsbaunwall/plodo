using plodo.Backend.API.Validation;

namespace plodo.Backend.API.Models
{
    public class CastVoteRequest
    {
        /// <summary>
        /// A vote in a session. Votes must be valid Unicode emojis
        /// </summary>
        [SingleVoteOptionValidator]
        public string Vote { get; set; }
    }
}