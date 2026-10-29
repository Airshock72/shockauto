using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.ListHandlers.GasolineTypes;

public record GetGasolineTypesQuery : IRequest<Result>;