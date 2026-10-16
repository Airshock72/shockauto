namespace ShockAuto.Application.Features.ListHandlers.GetManufacturers;

public record GetManufacturersResponse
{
    public int Id { get; init; }
    public required string Name { get; init; }
}