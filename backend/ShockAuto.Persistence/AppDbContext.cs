using Microsoft.EntityFrameworkCore;
using ShockAuto.Domain.Entities;
namespace ShockAuto.Persistence;

internal class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    
    public DbSet<Manufacturer> Manufacturers { get; set; }
    public DbSet<Model> Models { get; set; }

    public DbSet<Domain.Entities.Application> Applications { get; set; }
    public DbSet<ApplicationImage> ApplicationImages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}