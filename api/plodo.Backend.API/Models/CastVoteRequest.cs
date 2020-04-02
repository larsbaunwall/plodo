using plodo.Backend.API.Validation;

namespace plodo.Backend.API.Models
{
    public class CastVoteRequest
    {
        /// <summary>
        /// A vote in a session. Votes must be in the format of a-z, A-Z and hyphens
        /// </summary>
        [SingleVoteOptionValidator]
        public string Vote { get; set; }
    }
}