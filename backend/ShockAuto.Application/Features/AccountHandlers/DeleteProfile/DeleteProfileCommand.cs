using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.AccountHandlers.DeleteProfile;

public record DeleteProfileCommand : AuthenticatedRequest, IRequest<Result>;