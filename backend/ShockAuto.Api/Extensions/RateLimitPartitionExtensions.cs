using System.Threading.RateLimiting;

namespace ShockAuto.Api.Extensions;

public static class RateLimitPartitionExtensions
{
    public static RateLimitPartition<string> CreateFixedWindowLimiter(HttpContext httpContext, int rateLimit, TimeSpan window)
    {
        string ipAddress = GetClientIp(httpContext);
        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: ipAddress,
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = rateLimit,
                Window = window,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 0
            });
    }

    // Uses the TCP connection's IP; X-Forwarded-For is ignored because clients can spoof it.
    private static string GetClientIp(HttpContext httpContext) =>
        httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
}