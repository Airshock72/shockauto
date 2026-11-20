using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Persistence.Configurations;

public class ApplicationImageConfiguration : IEntityTypeConfiguration<ApplicationImage>
{
    public void Configure(EntityTypeBuilder<ApplicationImage> builder)
    {
        builder.Property(x => x.PublicId).HasMaxLength(256);
        builder.Property(x => x.Url).HasMaxLength(512);

        builder.HasIndex(x => new { x.ApplicationId, x.Order });
    }
}
