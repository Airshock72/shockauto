using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Interfaces.Repositories;

public interface IGasolineTypesRepository : IBaseRepository<GasolineType, int>
{
    public Task<IEnumerable<GasolineType>> GetAllGasolineTypes(CancellationToken cancellationToken = default);
}