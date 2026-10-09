using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Application.Interfaces.Services;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.AccountHandlers.UpdateProfile;

public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Result>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    
    public UpdateProfileCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async ValueTask<Result> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        User? user = await _userRepository.Get(request.UserId, cancellationToken);
        if (user is null)
            return Result.NotFound("accountDisabled");
        
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.DateOfBirth = request.BirthDate;
        user.PersonalNumber = request.PersonalNumber;
        user.Gender = request.Gender;
        user.MobilePhone = request.MobilePhone;

        await _unitOfWork.Commit(cancellationToken);
        return Result.Ok();
    }
}