namespace ShockAuto.Application.Features.ListHandlers.GetModels;

public record GetModelsResponse
{
    public required ModelItem[] TopModels { get; init; }
    public required ModelItem[] Models { get; init; }
}

public record ModelItem
{
    public int Id { get; init; }
    public required string Name { get; init; }
    public int ManufacturerId { get; init; }
}