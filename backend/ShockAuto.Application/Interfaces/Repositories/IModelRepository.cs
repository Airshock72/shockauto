using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Interfaces.Repositories;

public interface IModelRepository : IBaseRepository<Model, int>
{
    public Task<IEnumerable<Model>> GetModelsByManufacturerId(int manufacturerId, bool isTop, CancellationToken cancellationToken);
}
