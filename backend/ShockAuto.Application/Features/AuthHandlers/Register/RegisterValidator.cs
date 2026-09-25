using FluentValidation;

namespace ShockAuto.Application.Features.AuthHandlers.Register;

public class RegisterValidator : AbstractValidator<RegisterCommand>
{
    public RegisterValidator()
    {
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.FirstName).NotEmpty();
        RuleFor(x => x.LastName).NotEmpty();
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(10)
            .Matches("[A-Z]") // Include Big letters
            .Matches("[a-z]") // Include small letters
            .Matches("[0-9]") // Include numbers
            .Matches("[^a-zA-Z0-9]"); // Include special characters
    }
}