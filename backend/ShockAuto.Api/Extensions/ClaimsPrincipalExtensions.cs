using System.Security.Claims;
using ShockAuto.Application.Common;

namespace ShockAuto.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static void SetClaims<T>(this ClaimsPrincipal user, T record) where T : AuthenticatedRequest
    {
        Guid userId = Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);
        string email = user.FindFirstValue(ClaimTypes.Email)!;
        
        record.UserId = userId;
        record.Email = email;
    }
}