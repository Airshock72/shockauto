using System.Text.Json.Serialization;

namespace ShockAuto.Application.Common;

public record AuthenticatedRequest
{
    [JsonIgnore] public Guid UserId { get; set; }
    [JsonIgnore] public string? Email { get; set; }
}