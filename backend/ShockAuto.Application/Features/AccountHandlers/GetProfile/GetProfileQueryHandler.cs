using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.AccountHandlers.GetProfile;

public class GetProfileQueryHandler : IRequestHandler<GetProfileQuery, Result>
{
    private readonly IUserRepository _userRepository;
    
    public GetProfileQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async ValueTask<Result> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        User user = (await _userRepository.Get(request.UserId, cancellationToken))!;
        GetProfileResponse response = new()
        {
            UserId = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,

            Email = user.Email,
            DateOfBirth = user.DateOfBirth,
            Gender = user.Gender,
            MobilePhone = user.MobilePhone,
            PersonalNumber = user.PersonalNumber
        };

        return Result.Ok(response);
    }
}