using Microsoft.EntityFrameworkCore;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;
using ShockAuto.Persistence.Repositories.Common;

namespace ShockAuto.Persistence.Repositories;

internal class ManufacturerRepository(AppDbContext context) : BaseRepository<Manufacturer, int>(context), IManufacturerRepository
{
    public async Task<Manufacturer?> GetManufacturerByName(string manufacturerName, CancellationToken cancellationToken)
    {
        return await _context.Manufacturers.FirstOrDefaultAsync(m => m.Name == manufacturerName, cancellationToken);
    }

    public async Task<IEnumerable<Manufacturer>> GetManufacturers(bool isTop = false, CancellationToken cancellationToken = default)
    {
        IQueryable<Manufacturer> query = _context.Manufacturers;

        if (isTop)
        {
            query = query.Where(m => m.IsTop);
        }

        return await query
            .OrderBy(m => m.Name)
            .ToListAsync(cancellationToken);
    }
}