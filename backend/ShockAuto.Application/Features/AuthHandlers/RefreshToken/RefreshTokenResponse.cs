namespace ShockAuto.Application.Features.AuthHandlers.RefreshToken;

public record RefreshTokenResponse()
{
    public required string AccessToken { get; init; }
}