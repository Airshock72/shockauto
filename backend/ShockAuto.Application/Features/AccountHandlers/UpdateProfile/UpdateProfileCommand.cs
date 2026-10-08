using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Domain.Enums;

namespace ShockAuto.Application.Features.AccountHandlers.UpdateProfile;

public record UpdateProfileCommand : AuthenticatedRequest, IRequest<Result>
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public DateOnly? BirthDate { get; init; }
    public string? PersonalNumber { get; init; }
    public Gender? Gender { get; init; }
    public string? MobilePhone { get; init; }
}