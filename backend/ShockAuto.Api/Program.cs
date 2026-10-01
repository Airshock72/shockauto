using Scalar.AspNetCore;
using ShockAuto.Api;
using ShockAuto.Application;
using ShockAuto.Persistence;
using ShockAuto.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddServices(builder.Configuration);
builder.Services.AddPresentation(builder.Configuration);

var app = builder.Build();
if (!app.Environment.IsProduction())
{
    app.UseCors("AllowFrontend");
    app.MapOpenApi();
    app.MapScalarApiReference("/swagger");
}

app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();