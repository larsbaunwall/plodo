using plodo.Backend.Services;

namespace plodo.Backend.API.Models
{
        public class AccessToken
        {
            public string Token { get; set; }
            public string Type { get; set; }
            public int Expires { get; set; }

            public AccessToken()
            {
                
            }

            public AccessToken(SerializedSecurityToken stsToken)
            {
                Token = stsToken.Token;
                Type = stsToken.Type;
                Expires = stsToken.Expires;
            }
        }
}