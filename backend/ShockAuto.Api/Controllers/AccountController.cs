using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShockAuto.Api.Extensions;
using ShockAuto.Application.Common;
using ShockAuto.Application.Features.AccountHandlers.GetProfile;

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
}