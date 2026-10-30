using ShockAuto.Domain.Enums;

namespace ShockAuto.Domain.Entities;

public class CarCategory
{
    public int Id { get; init; }
    public required Category Name { get; set; }
    public required string NameKa { get; set; }
}