using Lamar;

namespace plodo.Backend.Services
{
    public class ServiceRegistry : Lamar.ServiceRegistry
    {
        public ServiceRegistry()
        {
            For<ISessionService>().Use<SessionService>().Singleton();
            For<ISecurityTokenService>().Use<SecurityTokenService>();
        }
    }
}