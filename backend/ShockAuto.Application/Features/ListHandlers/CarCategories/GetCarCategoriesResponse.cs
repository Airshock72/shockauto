using ShockAuto.Domain.Enums;

namespace ShockAuto.Application.Features.ListHandlers.CarCategories;

public record GetCarCategoriesResponse
{
    public int Id { get; init; }
    public required Category Name { get; init; }
    public required string NameKa { get; init; }
}