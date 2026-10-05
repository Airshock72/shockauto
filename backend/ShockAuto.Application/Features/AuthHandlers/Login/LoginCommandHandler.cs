using System.Security.Claims;
using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Application.Interfaces.Services;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.AuthHandlers.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, Result>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    private readonly IJwtService _jwtService;
    private readonly IPasswordHasher _passwordHasher;
    
    public LoginCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork, IJwtService jwtService, IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        
        _jwtService = jwtService;
        _passwordHasher = passwordHasher;
    }

    public async ValueTask<Result> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        User? user = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);

        if (user is null || !_passwordHasher.VerifyHashedPassword(request.Password, user.PasswordHash))
            return Result.NotFound("invalidCredentials");
        
        Claim[] userClaims = [new(ClaimTypes.Email, request.Email)];
        
        string accessToken = _jwtService.CreateToken(user.Id, false, userClaims);
        string refreshToken = _jwtService.CreateToken(user.Id, true, userClaims);
        
        LoginResponse response = new()
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
        };
        
        await _unitOfWork.Commit(cancellationToken);
        return Result.Ok(response);
    }
}