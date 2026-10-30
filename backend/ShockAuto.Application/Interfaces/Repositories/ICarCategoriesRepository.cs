using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Interfaces.Repositories;

public interface ICarCategoriesRepository : IBaseRepository<CarCategory, int>
{
    public Task<IEnumerable<CarCategory>> GetAllCarCategories(CancellationToken cancellationToken = default);
}