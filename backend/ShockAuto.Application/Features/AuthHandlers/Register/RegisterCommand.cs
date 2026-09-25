using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.AuthHandlers.Register;

public record RegisterCommand: IRequest<Result>
{
    public required string Email { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Password { get; init; }
}