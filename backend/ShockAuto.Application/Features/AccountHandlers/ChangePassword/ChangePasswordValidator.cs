using FluentValidation;

namespace ShockAuto.Application.Features.AccountHandlers.ChangePassword;

public class ChangePasswordValidator : AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordValidator()
    {
        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .MinimumLength(10)
            .Matches("[A-Z]") // Include Big letters
            .Matches("[a-z]") // Include small letters
            .Matches("[0-9]") // Include numbers
            .Matches("[^a-zA-Z0-9]"); // Include special characters
    }
}