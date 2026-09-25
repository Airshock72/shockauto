using Mediator;
using Microsoft.AspNetCore.Mvc;
using ShockAuto.Application.Common;
using ShockAuto.Application.Features.AuthHandlers.Register;

namespace ShockAuto.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ISender _sender;
    
    public AuthController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("Register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string),StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register(RegisterCommand command, CancellationToken cancellationToken)
    {
        Result result = await _sender.Send(command, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }
}