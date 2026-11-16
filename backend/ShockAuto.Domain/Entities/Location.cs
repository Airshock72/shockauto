using ShockAuto.Domain.Enums;

namespace ShockAuto.Domain.Entities;

public class Location
{
    public int Id { get; set; }
    public required string NameEn { get; set; }
    public required string NameKa { get; set; }
    public required CargoLocation Type { get; set; }
}
