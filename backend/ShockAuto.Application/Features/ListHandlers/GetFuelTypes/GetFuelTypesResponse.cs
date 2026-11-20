namespace ShockAuto.Application.Features.ListHandlers.GetFuelTypes;

public record GetFuelTypesResponse
{
    public int Id { get; init; }
    public required string Key { get; init; }
    public required string Name { get; init; }
    public required string Type { get; init; }
}
