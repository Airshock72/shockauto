using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Application.Interfaces.Services;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.AuthHandlers.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result>
{
    private readonly IPasswordHasher _passwordHasher;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserRepository _userRepository;

    public RegisterCommandHandler(IPasswordHasher passwordHasher, IUnitOfWork unitOfWork, IUserRepository userRepository)
    {
        _passwordHasher = passwordHasher;
        _unitOfWork = unitOfWork;
        _userRepository = userRepository;
    }

    public async ValueTask<Result> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if (await _userRepository.Exists(x => x.Email == request.Email, cancellationToken))
        {
            return new Result("userAlreadyExists", 409);
        }

        User newUser = new()
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            PasswordHash = _passwordHasher.HashPassword(request.Password),
            Email = request.Email
        };

        await _userRepository.Add(newUser, cancellationToken);
        await _unitOfWork.Commit(cancellationToken);

        return Result.Ok();
    }
}