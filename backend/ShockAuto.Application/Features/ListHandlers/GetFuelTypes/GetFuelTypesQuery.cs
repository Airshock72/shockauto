using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.ListHandlers.GetFuelTypes;

public record GetFuelTypesQuery : IRequest<Result>;