namespace ShockAuto.Services.Options;

public class JwtServiceOptions
{
    public required string Issuer { get; set; }
    public required string Key { get; set; }
    public int AccessTokenExpiryMinutes { get; set; }
    public int RefreshTokenExpiryDays { get; set; }
}