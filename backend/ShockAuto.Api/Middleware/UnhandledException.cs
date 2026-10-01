using System.Text.Json;
using ShockAuto.Application.Common;

namespace ShockAuto.Api.Middleware;

public class UnhandledException : IMiddleware
{
    private readonly ILogger<UnhandledException> _logger;
    
    public UnhandledException(ILogger<UnhandledException> logger)
    {
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";
            
            Result response = new("Internal Server Error", 500);
            string jsonResponse = JsonSerializer.Serialize(response);

            await context.Response.WriteAsync(jsonResponse);
            throw; // Propagate Exception across pipeline
        }
    }
}