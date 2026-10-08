using ShockAuto.Domain.Enums;

namespace ShockAuto.Domain.Entities;

public class User
{
    public Guid Id { get; init; }
    public required string Email { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string PasswordHash { get; init; }
    
    public DateOnly? DateOfBirth { get; init; }
    public string? PersonalNumber { get; init; }
    public Gender? Gender { get; init; }
    public string? MobilePhone { get; init; }
}