using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.AuthHandlers.Login;

public record LoginCommand : IRequest<Result>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
}