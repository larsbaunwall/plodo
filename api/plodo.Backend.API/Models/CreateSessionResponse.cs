namespace plodo.Backend.API.Models;

public class CreateSessionResponse
{
    /// <summary>
    /// The ID of the created session
    /// </summary>
    public string SessionId { get; set; }
        
    /// <summary>
    /// The provided ID of the user hosting the session
    /// </summary>
    public Guid UserId { get; set; }
        
    /// <summary>
    /// Access token to be used in all subsequent requests. Should be placed in the Authorization header
    /// </summary>
    public AccessToken AccessToken { get; set; }
}