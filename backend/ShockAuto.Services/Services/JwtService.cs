using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShockAuto.Application.Interfaces.Services;
using ShockAuto.Services.Options;

namespace ShockAuto.Services.Services;

public class JwtService : IJwtService
{
    private readonly JwtServiceOptions _options;

    public JwtService(IOptions<JwtServiceOptions> options)
    {
        _options = options.Value;
    }

    public string CreateToken(Guid userId, bool isRefresh = false, Claim[]? extraClaims = null)
    {
        string secretKey = _options.Key;
        string issuer = _options.Issuer;
        byte[] keyBytes = Encoding.UTF8.GetBytes(secretKey);

        SymmetricSecurityKey securityKey = new(keyBytes);
        SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256Signature);
        List<Claim> claims = new()
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        };
        
        if (extraClaims is not null)
            claims.AddRange(extraClaims);
        
        DateTime expireDate = DateTime.Now;
        if (isRefresh)
        {
            expireDate = expireDate.AddDays(_options.RefreshTokenExpiryDays);
            claims.Add(new Claim("isRefreshToken", "true", ClaimValueTypes.Boolean));
        }
        else
            expireDate = expireDate.AddMinutes(_options.AccessTokenExpiryMinutes);
        
        JwtSecurityToken securityToken = new(issuer: issuer, claims: claims, expires: expireDate, signingCredentials: credentials);
        string token = new JwtSecurityTokenHandler().WriteToken(securityToken);
        
        return token;
    }

    public bool RefreshTokenIsValid(string token)
    {
        JwtSecurityTokenHandler handler = new();
        JwtSecurityToken jwtToken = handler.ReadJwtToken(token);

        Claim? tokenType = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "isRefreshToken");
        return tokenType != null && jwtToken.ValidTo >= DateTime.Now;
    }

    public Claim[] GetClaimsFromToken(string token)
    {
        JwtSecurityTokenHandler handler = new();
        JwtSecurityToken jwtToken = handler.ReadJwtToken(token);

        return jwtToken.Claims.ToArray();
    }
}