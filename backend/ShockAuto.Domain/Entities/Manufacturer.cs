namespace ShockAuto.Domain.Entities;

public class Manufacturer
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public bool IsTop { get; set; }
}