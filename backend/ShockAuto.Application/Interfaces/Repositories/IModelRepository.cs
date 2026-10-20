using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Interfaces.Repositories;

public interface IModelRepository : IBaseRepository<Model, int>
{
    public Task<List<Model>> GetModelsByManufacturerId(int manufacturerId, CancellationToken cancellationToken);
}
