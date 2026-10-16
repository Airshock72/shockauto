using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using ShockAuto.Application.Common;
using ShockAuto.Application.Features.ListHandlers.GetManufacturers;

namespace ShockAuto.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("limitListsController")]
public class ListController : ControllerBase
{
    private readonly ISender _sender;
    public ListController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet("Manufacturers")]
    [ProducesResponseType(typeof(GetManufacturersResponse[]), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetManufacturers(CancellationToken cancellationToken)
    {
        GetManufacturersQuery query = new();
        Result result = await _sender.Send(query, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }
}