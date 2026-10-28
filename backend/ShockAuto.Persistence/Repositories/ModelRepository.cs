using Microsoft.EntityFrameworkCore;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;
using ShockAuto.Persistence.Repositories.Common;

namespace ShockAuto.Persistence.Repositories;

internal class ModelRepository(AppDbContext context) : BaseRepository<Model, int>(context), IModelRepository
{
    public async Task<IEnumerable<Model>> GetModelsByManufacturerId(int manufacturerId, bool isTop, CancellationToken cancellationToken)
    {
        return await _context.Models
            .Where(m => m.ManufacturerId == manufacturerId && m.IsTop == isTop)
            .OrderBy(m => m.Name)
            .ToListAsync(cancellationToken);
    }
}
