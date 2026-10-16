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
}