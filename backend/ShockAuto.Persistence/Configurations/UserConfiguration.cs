using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(x => x.FirstName).HasMaxLength(32);
        builder.Property(x => x.LastName).HasMaxLength(32);
        builder.Property(x => x.Email).HasMaxLength(64);
        builder.HasIndex(x => x.Email).IsUnique();
    }
}