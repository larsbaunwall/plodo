using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace plodo.Backend.Services
{
    public interface ISecurityTokenService
    {
        SerializedSecurityToken IssueToken(string sessionId, Guid audienceId, string[] roles);
    }

    public class SecurityTokenService : ISecurityTokenService
    {
        private readonly IConfiguration _configuration;

        public SecurityTokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public SerializedSecurityToken IssueToken(string sessionId, Guid audienceId, string[] roles)
        {
            var signingKey = Convert.FromBase64String(_configuration["Jwt:SigningSecret"]);
            var expiryDuration = int.Parse(_configuration["Jwt:ExpiryDuration"]);

            var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));

            var subject = new ClaimsIdentity(new[]
            {
                new Claim("session_id", sessionId.ToString()),
                new Claim("audience_id", audienceId.ToString()),
            });
            
            subject.AddClaims(roleClaims);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = null,              // Not required as no third-party is involved
                Audience = null,            // Not required as no third-party is involved
                IssuedAt = DateTime.UtcNow,
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(expiryDuration),
                Subject = subject,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(signingKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            return new SerializedSecurityToken
            {
                Token = jwtTokenHandler.WriteToken(jwtToken),
                Expires = expiryDuration,
                Type = "Bearer"
            };
        }
    }
}