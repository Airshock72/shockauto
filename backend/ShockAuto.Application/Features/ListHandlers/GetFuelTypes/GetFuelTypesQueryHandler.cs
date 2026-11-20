using System.Resources;
using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Resources;
using ShockAuto.Domain.Enums;

namespace ShockAuto.Application.Features.ListHandlers.GetFuelTypes;

public class GetFuelTypesQueryHandler : IRequestHandler<GetFuelTypesQuery, Result>
{
    private readonly ResourceManager _resourceManager;

    public GetFuelTypesQueryHandler()
    {
        _resourceManager = new ResourceManager(typeof(EnumTranslations));
    }

    public ValueTask<Result> Handle(GetFuelTypesQuery request, CancellationToken cancellationToken)
    {
        GetFuelTypesResponse[] fuelTypes = Enum.GetValues<Fuel>()
            .Select(fuel => new GetFuelTypesResponse
            {
                Id = (int)fuel + 1,
                Key = fuel.ToString(),
                Name = _resourceManager.GetString(fuel.ToString()) ?? fuel.ToString(),
                Type = GetGroup(fuel).ToString()
            }).ToArray();

        return ValueTask.FromResult(Result.Ok(fuelTypes));
    }

    private static FuelGroup GetGroup(Fuel fuel) => fuel switch
    {
        Fuel.Hybrid or Fuel.PlugInHybrid => FuelGroup.Hybrid,
        Fuel.Lpg or Fuel.Cng => FuelGroup.Gas,
        _ => FuelGroup.Common
    };
}
