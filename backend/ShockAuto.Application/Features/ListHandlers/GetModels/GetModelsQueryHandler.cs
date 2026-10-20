using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.ListHandlers.GetModels;

public class GetModelsQueryHandler : IRequestHandler<GetModelsQuery, Result>
{
    private static readonly int[] TopModelIds =
    [
        // Toyota
        13, 49, 18, 45, 28, 53,
        // Mercedes-Benz
        330, 239, 358, 378, 353, 266,
    ];

    private readonly IModelRepository _modelRepository;

    public GetModelsQueryHandler(IModelRepository modelRepository)
    {
        _modelRepository = modelRepository;
    }

    public async ValueTask<Result> Handle(GetModelsQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Model> models =await _modelRepository.GetModelsByManufacturerId(request.ManufacturerId, cancellationToken);

        GetModelsResponse response = new()
        {
            TopModels = models
                .Where(m => TopModelIds.Contains(m.Id))
                .OrderBy(m => Array.IndexOf(TopModelIds, m.Id))
                .Select(ToModelItem)
                .ToArray(),
            Models = models
                .Where(m => !TopModelIds.Contains(m.Id))
                .OrderBy(m => m.Name)
                .Select(ToModelItem)
                .ToArray()
        };

        return Result.Ok(response);
    }

    private static ModelItem ToModelItem(Model model) => new()
    {
        Id = model.Id,
        Name = model.Name,
        ManufacturerId = model.ManufacturerId,
    };
}
