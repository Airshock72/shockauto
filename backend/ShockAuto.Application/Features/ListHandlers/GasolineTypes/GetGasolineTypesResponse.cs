using ShockAuto.Domain.Enums;

namespace ShockAuto.Application.Features.ListHandlers.GasolineTypes;

public record GetGasolineTypesResponse
{
    public int Id { get; init; }
    public required string Name { get; init; }
    public required string NameKa { get; init; }
    public required Gasoline Type { get; init; }
}