using FluentValidation;

namespace ShockAuto.Application.Features.AccountHandlers.UpdateProfile;

public class UpdateProfileValidator : AbstractValidator<UpdateProfileCommand>
{
    public UpdateProfileValidator()
    { 
        RuleFor(x => x.FirstName).NotNull().NotEmpty();
        RuleFor(x => x.LastName).NotNull().NotEmpty();                                 
        RuleFor(x => x.BirthDate)
            .NotNull()
            .NotEmpty()
            .LessThanOrEqualTo(_ => DateOnly.FromDateTime(DateTime.UtcNow).AddYears(-13))
            .WithMessage("You must be at least 13 years old.");
        RuleFor(x => x.Gender).NotNull().NotEmpty().IsInEnum(); 
    }
}