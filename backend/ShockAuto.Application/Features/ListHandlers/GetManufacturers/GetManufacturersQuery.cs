using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.ListHandlers.GetManufacturers;

public record GetManufacturersQuery : IRequest<Result>;