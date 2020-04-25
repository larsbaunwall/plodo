using plodo.Backend.Services;

namespace plodo.Backend.API.Models
{
        public class AccessToken
        {
            /// <summary>
            /// A JWT token for authentication. Must be presented in the Authorization header on all requests in the session
            /// </summary>
            public string Token { get; set; }
            
            /// <summary>
            /// Type of token
            /// </summary>
            public string Type { get; set; }
            
            /// <summary>
            /// A JWT token expiry time in seconds
            /// </summary>
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