using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace plodo.Backend.API.Configurations;

public static class ConfigureAuthenticationExtension
{
    public static IServiceCollection ConfigureAuthentication(this IServiceCollection services, IConfigurationManager rootConfig)
    {
        var signingKey = Convert.FromBase64String(rootConfig["Jwt:SigningSecret"] ?? throw new InvalidOperationException());

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        var path = context.HttpContext.Request.PathBase;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            path.StartsWithSegments("/session-stream"))
                        {
                            // Read the token out of the query string instead of HTTP headers
                            context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };

                options.SaveToken = true;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    LifetimeValidator = (before, expires, token, param) => expires > DateTime.UtcNow,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(signingKey)
                };
            });

        return services;
    }
}