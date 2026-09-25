using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShockAuto.Application.Interfaces.Services;
using ShockAuto.Services.Services;

namespace ShockAuto.Services;

public static class DependencyInjection
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IPasswordHasher, PasswordHasher>();

        return services;
    }
}