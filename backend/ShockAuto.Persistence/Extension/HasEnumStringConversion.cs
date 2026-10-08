using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ShockAuto.Persistence.Extension;

public static class PropertyBuilderExtensions
{
    public static PropertyBuilder<TEnum> HasEnumStringConversion<TEnum>(this PropertyBuilder<TEnum> builder)
        where TEnum : struct, Enum
    {
        return builder.HasConversion(v => v.ToString(), v => Enum.Parse<TEnum>(v));
    }
    
    public static PropertyBuilder<TEnum?> HasEnumStringConversion<TEnum>(this PropertyBuilder<TEnum?> builder)
        where TEnum : struct, Enum
    {
        return builder.HasConversion(
            v => v.HasValue ? v.Value.ToString() : null,
            v => v == null ? null : Enum.Parse<TEnum>(v));
    }
}