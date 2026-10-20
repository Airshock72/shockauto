namespace ShockAuto.Application.Features.ListHandlers.GetManufacturers;

public record GetManufacturersResponse
{
    public required ManufacturerItem[] TopManufacturers { get; init; }
    public required ManufacturerItem[] Manufacturers { get; init; }
}

public record ManufacturerItem
{
    public int Id { get; init; }
    public required string Name { get; init; }
}