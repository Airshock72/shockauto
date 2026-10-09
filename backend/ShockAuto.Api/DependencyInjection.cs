using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using ShockAuto.Api.Extensions;
using ShockAuto.Api.Middleware;
using ShockAuto.Application.Interfaces.Services;

namespace ShockAuto.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer<BearerSecurityScheme>();
            options.AddDocumentTransformer<HideRedundantQueryParams>();
            options.AddSchemaTransformer<EnumToStringTransformer>();
        });

        services.AddControllers(options =>
        {
            // In .NET Core, if you return an empty response, it automatically returns a 204. The code below is used to return a 200 instead.
            options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
        })
        .AddJsonOptions(options => 
        { 
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });
        
        // Rate Limiters
        services.AddRateLimiter(options =>
        {
            options.OnRejected = async (context, cancellationToken) =>
            {
                Endpoint? endpoint = context.HttpContext.GetEndpoint();
                EnableRateLimitingAttribute? policy = endpoint?.Metadata.GetMetadata<EnableRateLimitingAttribute>();
                
                context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                context.HttpContext.Response.ContentType = "application/json";
                string message = policy?.PolicyName switch
                {
                    "limitVerificationEndpoint" => "verificationRateLimitHit",
                    _ => "Too Many Requests"
                };
                
                await context.HttpContext.Response.WriteAsync(JsonSerializer.Serialize(message), cancellationToken);
            };
            
            options.AddPolicy("limitVerificationEndpoint", 
                httpContext => RateLimitPartitionExtensions.CreateFixedWindowLimiter(httpContext, 1, TimeSpan.FromMinutes(1)));
            
            options.AddPolicy("limitListsController", 
                httpContext => RateLimitPartitionExtensions.CreateFixedWindowLimiter(httpContext, 20, TimeSpan.FromSeconds(5)));
            
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
            {
                Endpoint? endpoint = httpContext.GetEndpoint();
                if (endpoint?.Metadata.GetMetadata<EnableRateLimitingAttribute>() != null)
                    return RateLimitPartition.GetNoLimiter("endpoint-policy"); // We don't need a global limiter if the controller has its own limiter.

                
                return RateLimitPartitionExtensions.CreateFixedWindowLimiter(httpContext, 5, TimeSpan.FromSeconds(1));
            });
        });
        
        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", policy =>
                policy.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        });
        
        //JWT
        string jwtKey = configuration.GetSection("JwtServiceOptions:Key").Get<string>()!;
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                };
            });
        
        services.AddTransient<UnhandledException>();

        return services;
    }
}