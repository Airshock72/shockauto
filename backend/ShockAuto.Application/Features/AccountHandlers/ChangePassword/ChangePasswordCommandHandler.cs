using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Application.Interfaces.Services;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.AccountHandlers.ChangePassword;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Result>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPasswordHasher _passwordHasher;
    
    public ChangePasswordCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork, IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _passwordHasher = passwordHasher;
    }

    public async ValueTask<Result> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        User? user = await _userRepository.Get(request.UserId, cancellationToken);
        if (user is null)
            return Result.NotFound("accountDisabled");

        user.PasswordHash = _passwordHasher.HashPassword(request.NewPassword);
        
        await _unitOfWork.Commit(cancellationToken);
        return Result.Ok();
    }
}