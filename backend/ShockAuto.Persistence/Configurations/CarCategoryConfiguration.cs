using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShockAuto.Domain.Entities;
using ShockAuto.Persistence.Extension;

namespace ShockAuto.Persistence.Configurations;

public class CarCategoryConfiguration : IEntityTypeConfiguration<CarCategory>
{
    public void Configure(EntityTypeBuilder<CarCategory> builder)
    {
        builder.Property(x => x.Name).HasEnumStringConversion().HasMaxLength(32);
        builder.Property(x => x.NameKa).HasMaxLength(32);
    }
}