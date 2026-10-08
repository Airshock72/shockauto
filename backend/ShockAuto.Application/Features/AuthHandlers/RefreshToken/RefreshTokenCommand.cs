using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.AuthHandlers.RefreshToken;

public record RefreshTokenCommand : IRequest<Result>
{
    public required string RefreshToken { get; init; }
}