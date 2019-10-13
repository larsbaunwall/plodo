using System;
using System.Threading;
using System.Threading.Tasks;
using Lamar;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace plodo.Backend.API.Health
{
    public class ContainerHealthCheck : IHealthCheck
    {
        private readonly IContainer _ioc;

        public ContainerHealthCheck(IContainer container)
        {
            _ioc = container;
        }
        
        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
        {
            try
            {
                _ioc.AssertConfigurationIsValid(AssertMode.ConfigOnly);
                return HealthCheckResult.Healthy();
            }
            catch (Exception e)
            {
                return HealthCheckResult.Unhealthy("Container configuration is not valid", e);
            }
            
        }
    }
}