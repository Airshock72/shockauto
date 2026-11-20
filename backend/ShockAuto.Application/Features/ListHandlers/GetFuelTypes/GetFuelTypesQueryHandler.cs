using System.Resources;
using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Features.ListHandlers.Common;
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
        GetEnumsResponse[] fuelTypes = EnumsResponseMapper.From<Fuel>(_resourceManager);
        return ValueTask.FromResult(Result.Ok(fuelTypes));
    }
}