using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShockAuto.Domain.Entities;
using ShockAuto.Persistence.Extension;

namespace ShockAuto.Persistence.Configurations;

public class GasolineTypeConfiguration : IEntityTypeConfiguration<GasolineType>
{
    public void Configure(EntityTypeBuilder<GasolineType> builder)
    {
        builder.Property(x => x.Name).HasMaxLength(32);
        builder.Property(x => x.NameKa).HasMaxLength(32);
        builder.Property(x => x.Type).HasEnumStringConversion().HasMaxLength(32);
    }
}
