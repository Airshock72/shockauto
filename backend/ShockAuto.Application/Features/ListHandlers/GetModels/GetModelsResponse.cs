namespace ShockAuto.Application.Features.ListHandlers.GetModels;

public record GetModelsResponse
{
    public int Id { get; init; }
    public required string Name { get; init; }
    public int ManufacturerId { get; init; }
}