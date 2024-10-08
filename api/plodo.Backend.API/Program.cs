using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using Asp.Versioning.ApiExplorer;
using Lamar.Microsoft.DependencyInjection;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Cors.Infrastructure;
using plodo.Backend.API;
using plodo.Backend.API.Configurations;
using plodo.Backend.API.Health;
using Serilog;
using Serilog.Core.Enrichers;
using Serilog.Enrichers.AspNetCore.HttpContext;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo
    .Console(theme: AnsiConsoleTheme.Code)
    .WriteTo
    .ApplicationInsights(TelemetryConfiguration.CreateDefault(), TelemetryConverter.Traces)
    .WriteTo.File(
        @"D:\home\LogFiles\Application\serilog.log",
        fileSizeLimitBytes: 1_000_000,
        rollOnFileSizeLimit: true,
        shared: true,
        flushToDiskInterval: TimeSpan.FromSeconds(1))
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Host.UseLamar(registry => registry.IncludeRegistry<ApiRegistry>());
builder.Services.AddSerilog();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.Never;
        options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

builder.Services.AddServerSentEvents(x =>
{
    x.OnClientConnected += (service, args) =>
    {
        var sessionId = args.Client.User.FindFirstValue("session_id");
        Log.Information("SSE client trying to connect to session {SessionId} ", sessionId);

        if (sessionId != null)
            service.AddToGroup(sessionId, args.Client);
    };
});

builder.Services.AddHealthChecks()
    .AddCheck<ContainerHealthCheck>("ioc");

builder.Services.ConfigureAuthentication(builder.Configuration);
builder.Services.ConfigureCors();

builder.Services.AddApplicationInsightsTelemetry();
builder.Services.AddMvc();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.ConfigureSwagger();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/error");

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
        //TODO: Maybe this should be more limited in the future.
        x.Headers.Append(CorsConstants.AccessControlAllowOrigin, "*");
        x.Headers.Append(CorsConstants.AccessControlAllowCredentials, "true");

        Log.Information("SSE connection prepared, {@HttpResponse}", x);
    }
});

app.UseSerilogLogContext(options =>
{
    options.EnrichersForContextFactory = context =>
    [
        new PropertyEnricher("TraceIdentifier", context.TraceIdentifier),
        new PropertyEnricher("RequestHeaders", context.Request?.Headers)
    ];
});

app.UseSerilogRequestLogging();

app.UseHealthChecks("/health");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseStaticFiles();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
    foreach (var description in  provider.ApiVersionDescriptions)
    {
        options.SwaggerEndpoint(
            $"/swagger/{description.GroupName}/swagger.json",
            description.GroupName.ToUpperInvariant());
    }

    options.RoutePrefix = "";
    options.InjectStylesheet("/swagger-ui.css");
});

app.Run();