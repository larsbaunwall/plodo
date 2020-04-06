using System.Net;
using Microsoft.Extensions.DependencyInjection;

namespace plodo.Backend.API.Configurations
{
    public static class ConfigureCorsExtension
    {
        public static IServiceCollection ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(x => x.AddDefaultPolicy(builder =>
            {
                builder
                    .WithOrigins(
                        "https://www.plodo.io", 
                        "https://plodo.io",
                        "https://www-qa.plodo.io", 
                        "http://localhost:8080",
                        "https://localhost:5001")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithExposedHeaders(HttpResponseHeader.Location.ToString());
            }));

            return services;
        }
    }
}