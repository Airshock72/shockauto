using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace ShockAuto.Api.Extensions;

public class HideRedundantQueryParams : IOpenApiDocumentTransformer
{
    private static readonly string[] RedundantParams = { "UserId" };
    public async Task TransformAsync(OpenApiDocument document, OpenApiDocumentTransformerContext context, CancellationToken cancellationToken)
    {
        foreach (var openApiPath in document.Paths)
        {
            foreach (var operation in openApiPath.Value.Operations!)
            {
                if (operation.Key != HttpMethod.Get)
                    continue;

                // Remove hidden query parameters from the operation's parameters
                if (operation.Value.Parameters != null)
                {
                    operation.Value.Parameters = operation.Value.Parameters.Where(p => !RedundantParams.Contains(p.Name)).ToList();
                }
            }
        }
    }
}