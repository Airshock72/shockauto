using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.ListHandlers.GetModels;

public record GetModelsQuery : IRequest<Result>
{
    public int ManufacturerId { get; init; }
}