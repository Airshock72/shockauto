namespace ShockAuto.Application.Common;

public record Result
{
    public object? Data { get; set; }
    public int StatusCode { get; set; }

    public Result(object? data, int statusCode)
    {
        Data = data;
        StatusCode = statusCode;
    }
    
    public static Result Ok(object? data = null)
    {
        return new(data, 200);
    }
    
    public static Result BadRequest(string? message = null)
    {
        return new(message, 400);
    }

    public static Result NotFound(string? message = null)
    {
        return new(message, 404);
    }

    public static Result Forbidden(string? message = null)
    {
        return new(message, 403);
    }
}