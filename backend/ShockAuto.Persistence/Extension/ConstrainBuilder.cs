namespace ShockAuto.Persistence.Extension;

public static class ConstraintBuilder
{
    public static string BuildEnumInConstraint<TEnum>(string columnName) where TEnum : Enum
    {
        string values = string.Join(", ", Enum.GetNames(typeof(TEnum)).Select(v => $"'{v}'"));
        return $"[{columnName}] IN ({values})";
    }
}