using plodo.Backend.API.Validation;

namespace plodo.Backend.API.Models;

public class CreateSessionRequest
{
    /// <summary>
    /// A list of valid votes. Votes must be valid Unicode emojis
    /// </summary>
    [MultiVoteOptionValidator]
    public IEnumerable<string> VotingOptions { get; set; }
}