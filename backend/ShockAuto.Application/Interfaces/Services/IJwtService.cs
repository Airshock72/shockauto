using System.Security.Claims;

namespace ShockAuto.Application.Interfaces.Services;

public interface IJwtService
{
    public string CreateToken(Guid userId, bool isRefresh = false, Claim[]? extraClaims = null);
    public bool RefreshTokenIsValid(string token);
    public Claim[] GetClaimsFromToken(string token);
}