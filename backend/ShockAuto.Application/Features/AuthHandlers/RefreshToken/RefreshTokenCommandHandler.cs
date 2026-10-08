using System.Security.Claims;
using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Application.Interfaces.Services;

namespace ShockAuto.Application.Features.AuthHandlers.RefreshToken;

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, Result>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;
    
    public RefreshTokenCommandHandler(IUserRepository userRepository, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async ValueTask<Result> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        bool tokenIsValid = _jwtService.RefreshTokenIsValid(request.RefreshToken);
        if (!tokenIsValid)
            return new Result(null, 400);

        Claim[] tokenClaims = _jwtService.GetClaimsFromToken(request.RefreshToken);

        Guid userId = Guid.Parse(tokenClaims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)!.Value);
        Claim[] userClaims = tokenClaims.Where(claim => claim.Type != ClaimTypes.NameIdentifier).ToArray();

        RefreshTokenResponse response = new()
        {
            AccessToken = _jwtService.CreateToken(userId, extraClaims: userClaims)
        };

        return Result.Ok(response);
    }
}