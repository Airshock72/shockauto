using System.Text.Json.Nodes;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace ShockAuto.Api.Extensions;

internal sealed class EnumToStringTransformer : IOpenApiSchemaTransformer
{
    public async Task TransformAsync(OpenApiSchema schema, OpenApiSchemaTransformerContext context, CancellationToken cancellationToken)
    {
        Type type = Nullable.GetUnderlyingType(context.JsonTypeInfo.Type) ?? context.JsonTypeInfo.Type;
        if (type.IsEnum)
        {
            schema.Type = JsonSchemaType.String;
            schema.Enum = Enum.GetNames(type).Select(name => (JsonNode)name).ToList();
        }
    }
}