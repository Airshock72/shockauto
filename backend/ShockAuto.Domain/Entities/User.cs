using ShockAuto.Domain.Enums;

namespace ShockAuto.Domain.Entities;

public class User
{
    public Guid Id { get; init; }
    public required string Email { get; init; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string PasswordHash { get; set; }
    
    public DateOnly? DateOfBirth { get; set; }
    public string? PersonalNumber { get; set; }
    public Gender? Gender { get; set; }
    public string? MobilePhone { get; set; }
}