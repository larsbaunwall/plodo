using plodo.Backend.Repositories;

namespace plodo.Backend.Services;

public class ServiceRegistry : Lamar.ServiceRegistry
{
    public ServiceRegistry()
    {
        IncludeRegistry<RepositoryRegistry>();
            
        For<ISessionService>().Use<SessionService>();
        For<ISecurityTokenService>().Use<SecurityTokenService>();
    }
}