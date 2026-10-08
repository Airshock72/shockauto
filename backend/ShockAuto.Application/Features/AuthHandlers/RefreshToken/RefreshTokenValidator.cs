using FluentValidation;

namespace ShockAuto.Application.Features.AuthHandlers.RefreshToken;

public class RefreshTokenValidator : AbstractValidator<RefreshTokenCommand>
{
    public RefreshTokenValidator()
    {
        RuleFor(x => x.RefreshToken).NotNull().NotEmpty();
    }
}