using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using ShockAuto.Application.Common;
using ShockAuto.Application.Features.ListHandlers.CarCategories;
using ShockAuto.Application.Features.ListHandlers.GasolineTypes;
using ShockAuto.Application.Features.ListHandlers.GetManufacturers;
using ShockAuto.Application.Features.ListHandlers.GetModels;

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

    [Authorize]
    [HttpGet("Manufacturers")]
    [ProducesResponseType(typeof(GetManufacturersResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetManufacturers(CancellationToken cancellationToken)
    {
        GetManufacturersQuery query = new();
        Result result = await _sender.Send(query, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }

    [Authorize]
    [HttpGet("Models/{manufacturerId:int}")]
    [ProducesResponseType(typeof(GetModelsResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetModels([FromRoute] int manufacturerId, CancellationToken cancellationToken)
    {
        GetModelsQuery query = new() { ManufacturerId = manufacturerId };
        Result result = await _sender.Send(query, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }

    [Authorize]
    [HttpGet("GasolineTypes")]
    [ProducesResponseType(typeof(GetGasolineTypesResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetGasolineTypes(CancellationToken cancellationToken)
    {
        GetGasolineTypesQuery query = new();
        Result result = await _sender.Send(query, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }

    [Authorize]
    [HttpGet("CarCategories")]
    [ProducesResponseType(typeof(GetCarCategoriesResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetCarCategories(CancellationToken cancellationToken)
    {
        GetCarCategoriesQuery query = new();
        Result result = await _sender.Send(query, cancellationToken);
        return StatusCode(result.StatusCode, result.Data);
    }
}