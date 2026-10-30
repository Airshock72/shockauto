using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Persistence.Repositories;
using ShockAuto.Persistence.Repositories.Common;

namespace ShockAuto.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        //Database
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("Database"));
        });
        
        //Repositories
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<IManufacturerRepository, ManufacturerRepository>();
        services.AddScoped<IModelRepository, ModelRepository>();
        services.AddScoped<IGasolineTypesRepository, GasolineTypeRepository>();
        services.AddScoped<ICarCategoriesRepository, CarCategoriesRepository>();

        return services;
    }
}