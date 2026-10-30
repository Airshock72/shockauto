using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.ListHandlers.GasolineTypes;

public class GetGasolineTypesQueryHandler: IRequestHandler<GetGasolineTypesQuery, Result>
{
    private readonly IGasolineTypesRepository _gasolineTypesRepository;

    public GetGasolineTypesQueryHandler(IGasolineTypesRepository gasolineTypesRepository)
    {
        _gasolineTypesRepository = gasolineTypesRepository;
    }

    public async ValueTask<Result> Handle(GetGasolineTypesQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<GasolineType> gasolineTypes = await _gasolineTypesRepository.GetAllGasolineTypes(cancellationToken);

        GetGasolineTypesResponse[] response = gasolineTypes
            .Select(x => new GetGasolineTypesResponse
            {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                NameKa = x.NameKa
            })
            .OrderBy(x => x.Name).ToArray();

        return Result.Ok(response);
    }
}