namespace ShockAuto.Application.Features.ListHandlers.Common;

public record GetEnumsResponse()
{
    public int Id { get; init; }
    public required string Key { get; init; }
    public required string Name { get; init; }
}