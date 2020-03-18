using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace plodo.Backend.API.Configurations
{
    public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
    {
        readonly IApiVersionDescriptionProvider provider;

        public ConfigureSwaggerOptions( IApiVersionDescriptionProvider provider ) =>
            this.provider = provider;

        public void Configure( SwaggerGenOptions options )
        {
            foreach ( var description in provider.ApiVersionDescriptions )
            {
                options.SwaggerDoc(
                    description.GroupName,
                    CreateInfoForApiVersion(description));
                
            }
            
            options.DescribeAllEnumsAsStrings();
            options.DescribeStringEnumsInCamelCase();
            options.DescribeAllParametersInCamelCase();
                
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            options.IncludeXmlComments(xmlPath);
                
            options.OperationFilter<AppendAuthorizeToSummaryOperationFilter>();
            options.OperationFilter<SecurityRequirementsOperationFilter>();
                
            options.OperationFilter<SwaggerDefaultValues>();

            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description =
                    "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });
        }
        
        static OpenApiInfo CreateInfoForApiVersion( ApiVersionDescription description )
        {
            var info = new OpenApiInfo()
            {
                Title = "plodo API",
                Version = description.ApiVersion.ToString(),
                Description = "Backend API for the plodo.io realtime audience feedback",
                Contact = new OpenApiContact() { Name = "Lars Baunwall", Email = "larslb@plodo.io" },
                License = new OpenApiLicense() { Name = "Commercial" }
            };

            if ( description.IsDeprecated )
            {
                info.Description += " This API version has been deprecated.";
            }

            return info;
        }
    }
    public static class SwaggerExtensions
    {
        public static IServiceCollection AddSwaggerConfiguration(this IServiceCollection services)
        {
            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
            services.AddSwaggerGen();

            return services;
        }
    }
    public class SwaggerDefaultValues : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var apiDescription = context.ApiDescription;
            var apiVersion = apiDescription.GetApiVersion();
            var model = apiDescription.ActionDescriptor.GetApiVersionModel( ApiVersionMapping.Implicit );

            operation.Deprecated = model.DeprecatedApiVersions.Contains( apiVersion );

            if ( operation.Parameters == null )
            {
                return;
            }

            foreach ( var parameter in operation.Parameters )
            {
                var description = apiDescription.ParameterDescriptions
                    .First( p => p.Name == parameter.Name );
                var routeInfo = description.RouteInfo;
                
                if (string.IsNullOrEmpty(parameter.Name))
                {
                    parameter.Name = description.ModelMetadata?.Name;
                }
                
                if ( parameter.Description == null )
                {
                    parameter.Description = description.ModelMetadata?.Description;
                }

                if (routeInfo == null)
                {
                    continue;
                }

                parameter.Required |= !routeInfo.IsOptional;
            }
        }
    }
}