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
        List<Model> models = await _modelRepository.GetModelsByManufacturerId(request.ManufacturerId, cancellationToken);
        GetModelsResponse[] response = models.Select(m => new GetModelsResponse
            {
                Id = m.Id,
                Name = m.Name,
                ManufacturerId = m.ManufacturerId,
            }).OrderBy(m => m.Name).ToArray();

        return Result.Ok(response);
    }
}
