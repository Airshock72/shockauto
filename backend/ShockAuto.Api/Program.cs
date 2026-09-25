using Scalar.AspNetCore;
using ShockAuto.Application;
using ShockAuto.Persistence;
using ShockAuto.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddServices(builder.Configuration);

builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

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

app.Run();