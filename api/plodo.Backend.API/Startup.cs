﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Lamar;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Options;
using plodo.Backend.API.Configurations;
using plodo.Backend.API.Health;
using System.Text.Json;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace plodo.Backend.API
{
    public class Startup
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfiguration _config;
        private readonly ILogger _logger;

        public Startup(IHostingEnvironment env, IConfiguration config, ILogger<Startup> logger)
        {
            _env = env;
            _config = config;
            _logger = logger;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureContainer(ServiceRegistry services)
        {
            services.AddOptions();
            services.AddControllers()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(
                        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                    options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });

            services.AddServerSentEvents(x =>
            {
                x.OnClientConnected += async (service, args) =>
                {
                    var sessionId = args.Client.User.FindFirstValue("session_id");
                    _logger.LogInformation("SSE client trying to connect to session {SessionId} ", sessionId);

                    if (sessionId != null)
                        await service.AddToGroupAsync(sessionId, args.Client);
                };
            });

            services.AddHealthChecks()
                .AddCheck<ContainerHealthCheck>("ioc");

            services.ConfigureAuthentication(_config);

            services.ConfigureCors();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddApiVersioning(x => x.ReportApiVersions = true);
            services.AddVersionedApiExplorer(options =>
            {
                options.GroupNameFormat = "'v'VVV";
                options.SubstituteApiVersionInUrl = true;
            });
            services.ConfigureSwagger();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApiVersionDescriptionProvider provider)
        {
            _logger.LogInformation("Starting application in {env}", _env.EnvironmentName);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.MapServerSentEvents("/session-stream", new ServerSentEventsOptions
            {
                Authorization = new ServerSentEventsAuthorization
                {
                    AuthenticationSchemes = "Bearer"
                },
                OnPrepareAccept = x =>
                {
                    x.Headers.Add(CorsConstants.AccessControlAllowOrigin, "http://localhost:8080");
                    x.Headers.Add(CorsConstants.AccessControlAllowOrigin, "https://www.plodo.io");
                    x.Headers.Add(CorsConstants.AccessControlAllowOrigin, "https://www-qa.plodo.io");
                    x.Headers.Add(CorsConstants.AccessControlAllowCredentials, "true");
                    
                    _logger.LogInformation("SSE connection prepared, {HttpResponse}", x);
                }
            });

            app.UseHealthChecks("/health");

            app.UseAuthentication();

            app.UseStaticFiles();
            app.UseCors();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                foreach (var description in provider.ApiVersionDescriptions)
                {
                    options.SwaggerEndpoint(
                        $"/swagger/{description.GroupName}/swagger.json",
                        description.GroupName.ToUpperInvariant());
                }

                options.RoutePrefix = "";
                options.InjectStylesheet("/swagger-ui.css");
            });
        }
    }
}