using System;
using System.Net.Security;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using Cassandra;
using Lamar;
using Microsoft.Extensions.Configuration;

namespace plodo.Backend.Repositories;

public class RepositoryRegistry : ServiceRegistry
{
    public RepositoryRegistry()
    {
        For<ICluster>().Use(ctx => ConfigureCluster(ctx.GetInstance<IConfiguration>())).Singleton();
        For<ISession>().Use(ctx => ConfigureSession(ctx.GetInstance<IConfiguration>(), ctx.GetInstance<ICluster>())).Singleton();

        For<ISessionRepository>().Use<SessionRepository>();
    }

    private static ICluster ConfigureCluster(IConfiguration configuration)
    {
        var host = configuration["Cassandra:Hosts"];
        var port = int.Parse(configuration["Cassandra:Port"] ?? "9042");
        var user = configuration["Cassandra:Username"];
        var password = configuration["Cassandra:Password"];

        var options = new SSLOptions(SslProtocols.Tls12, true, ValidateServerCertificate);
        options.SetHostNameResolver(_ => host);

        return Cluster.Builder()
            .WithCredentials(user, password)
            .WithPort(port)
            .AddContactPoint(host)
            .WithSSL(options)
            .Build();
    }

    private static ISession ConfigureSession(IConfiguration configuration, ICluster cluster)
    {
        var defaultKeyspace = configuration["Cassandra:DefaultKeyspace"];
        return cluster.Connect(defaultKeyspace);
    }

    private static bool ValidateServerCertificate(
        object sender,
        X509Certificate certificate,
        X509Chain chain,
        SslPolicyErrors sslPolicyErrors)
    {
        if (sslPolicyErrors == SslPolicyErrors.None)
            return true;

        Console.WriteLine("Certificate error: {0}", sslPolicyErrors);
        // Do not allow this client to communicate with unauthenticated servers.
        return false;
    }
}