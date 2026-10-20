using Microsoft.EntityFrameworkCore;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;
using ShockAuto.Persistence.Repositories.Common;

namespace ShockAuto.Persistence.Repositories;

internal class ModelRepository(AppDbContext context) : BaseRepository<Model, int>(context), IModelRepository
{
    public async Task<List<Model>> GetModelsByManufacturerId(int manufacturerId, CancellationToken cancellationToken)
    {
        return await _context.Models
            .Where(m => m.ManufacturerId == manufacturerId)
            .ToListAsync(cancellationToken);
    }
}
