using Mediator;
using Microsoft.AspNetCore.Mvc;

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
}