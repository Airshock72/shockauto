using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.ListHandlers.GetModels;

public class GetModelsQueryHandler : IRequestHandler<GetModelsQuery, Result>
{
    private readonly IModelRepository _modelRepository;

    public GetModelsQueryHandler(IModelRepository modelRepository)
    {
        _modelRepository = modelRepository;
    }

    public async ValueTask<Result> Handle(GetModelsQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Model> topModels = await _modelRepository.GetModelsByManufacturerId(request.ManufacturerId, true, cancellationToken);
        IEnumerable<Model> models = await _modelRepository.GetModelsByManufacturerId(request.ManufacturerId, false, cancellationToken);

        GetModelsResponse response = new()
        {
            TopModels = topModels.Select(ToModelItem).ToArray(),
            Models = models.Select(ToModelItem).ToArray()
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
