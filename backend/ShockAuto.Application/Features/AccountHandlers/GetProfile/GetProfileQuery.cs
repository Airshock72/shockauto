using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.AccountHandlers.GetProfile;

public record GetProfileQuery : AuthenticatedRequest, IRequest<Result>;