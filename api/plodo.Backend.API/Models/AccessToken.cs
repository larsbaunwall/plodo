using plodo.Backend.Services;

namespace plodo.Backend.API.Models
{
        public class AccessToken
        {
            public string Access_Token { get; set; }
            public string Token_Type { get; set; }
            public int Expires_In { get; set; }

            public AccessToken()
            {
                
            }

            public AccessToken(SerializedSecurityToken stsToken)
            {
                Access_Token = stsToken.Token;
                Token_Type = stsToken.Type;
                Expires_In = stsToken.Expires;
            }
        }
}