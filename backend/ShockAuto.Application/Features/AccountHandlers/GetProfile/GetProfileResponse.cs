using ShockAuto.Domain.Enums;

namespace ShockAuto.Application.Features.AccountHandlers.GetProfile;

public record GetProfileResponse
{
    public required Guid UserId { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }

    public required string Email { get; init; }
    public DateOnly? DateOfBirth { get; init; }
    public string? PersonalNumber { get; init; }
    public Gender? Gender { get; init; }
    public string? MobilePhone { get; init; }
}