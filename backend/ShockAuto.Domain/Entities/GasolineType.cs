using ShockAuto.Domain.Enums;

namespace ShockAuto.Domain.Entities;

public class GasolineType
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public Gasoline Type { get; set; }
}