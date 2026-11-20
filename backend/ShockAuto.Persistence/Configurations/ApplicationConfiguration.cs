using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShockAuto.Persistence.Extension;
using ApplicationEntity = ShockAuto.Domain.Entities.Application;

namespace ShockAuto.Persistence.Configurations;

public class ApplicationConfiguration : IEntityTypeConfiguration<ApplicationEntity>
{
    public void Configure(EntityTypeBuilder<ApplicationEntity> builder)
    {
        builder.Property(x => x.Id).ValueGeneratedNever();

        builder.Property(x => x.Category).HasEnumStringConversion().HasMaxLength(32);
        builder.Property(x => x.FuelType).HasEnumStringConversion().HasMaxLength(32);
        builder.Property(x => x.BodyType).HasEnumStringConversion().HasMaxLength(32);
        builder.Property(x => x.TransmissionType).HasEnumStringConversion().HasMaxLength(32);
        builder.Property(x => x.DriveTrain).HasEnumStringConversion().HasMaxLength(32);
        builder.Property(x => x.ExteriorColor).HasEnumStringConversion().HasMaxLength(32);
        builder.Property(x => x.InteriorColor).HasEnumStringConversion().HasMaxLength(32);
        builder.Property(x => x.InteriorMaterial).HasEnumStringConversion().HasMaxLength(32);

        builder.Property(x => x.TrimLevel).HasMaxLength(64);
        builder.Property(x => x.EngineDisplacement).HasPrecision(3, 1);
        builder.Property(x => x.Description).HasMaxLength(4000);
        builder.Property(x => x.MobilePhone).HasMaxLength(32);
        
        builder.HasOne(x => x.Manufacturer).WithMany().HasForeignKey(x => x.ManufacturerId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.Model).WithMany().HasForeignKey(x => x.ModelId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.Location).WithMany().HasForeignKey(x => x.LocationId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.Currency).WithMany().HasForeignKey(x => x.CurrencyId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Images)
            .WithOne(x => x.Application)
            .HasForeignKey(x => x.ApplicationId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
