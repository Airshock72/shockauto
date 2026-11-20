using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShockAuto.Application.Interfaces.Services;
using ShockAuto.Services.Options;
using ShockAuto.Services.Services;

namespace ShockAuto.Services;

public static class DependencyInjection
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtServiceOptions>(configuration.GetSection("JwtServiceOptions"));
        services.Configure<CloudinaryOptions>(configuration.GetSection("CloudinaryOptions"));

        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IFileStorageService, CloudinaryService>();

        return services;
    }
}