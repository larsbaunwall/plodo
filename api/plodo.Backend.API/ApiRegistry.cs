using Lamar;

namespace plodo.Backend.API;

public class ApiRegistry : ServiceRegistry
{
    public ApiRegistry()
    {
        IncludeRegistry<Services.ServiceRegistry>();
    }
}