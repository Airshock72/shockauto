using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShockAuto.Api.Extensions;
using ShockAuto.Application.Common;
using ShockAuto.Application.Features.AccountHandlers.ChangePassword;
using ShockAuto.Application.Features.AccountHandlers.DeleteProfile;
using ShockAuto.Application.Features.AccountHandlers.GetProfile;
using ShockAuto.Application.Features.AccountHandlers.UpdateProfile;

namespace ShockAuto.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly ISender _sender;
    
    public AccountController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet("Profile")]
    [ProducesResponseType(typeof(GetProfileResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetProfile(CancellationToken cancellationToken)
    {
        GetProfileQuery query = new();
        User.SetClaims(query);

        Result result = await _sender.Send(query, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }

    [HttpPut("Profile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> UpdateProfile(UpdateProfileCommand command, CancellationToken cancellationToken)
    {
        User.SetClaims(command);

        Result result = await _sender.Send(command, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }

    [HttpPut("ChangePassword")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ChangePassword(ChangePasswordCommand command, CancellationToken cancellationToken)
    {
        User.SetClaims(command);

        Result result = await _sender.Send(command, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }

    [HttpDelete("Profile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> DeleteProfile(DeleteProfileCommand command, CancellationToken cancellationToken)
    {
        User.SetClaims(command);
        
        Result result = await _sender.Send(command, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }
}