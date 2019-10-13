namespace plodo.Backend.API.Models
{
    public class CreateSessionResponse
    {
        public string SessionId { get; set; }
        
        public AccessToken Token { get; set; }
    }
}