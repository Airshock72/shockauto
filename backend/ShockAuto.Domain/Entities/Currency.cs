namespace ShockAuto.Domain.Entities;

public record Currency
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Code { get; set; }
    public required string Country { get; set; }
}