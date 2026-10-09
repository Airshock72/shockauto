using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.AccountHandlers.ChangePassword;

public record ChangePasswordCommand : AuthenticatedRequest, IRequest<Result>
{
    public required string NewPassword { get; init; }
}