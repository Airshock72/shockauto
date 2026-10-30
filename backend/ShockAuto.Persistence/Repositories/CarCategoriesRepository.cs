using Microsoft.EntityFrameworkCore;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;
using ShockAuto.Persistence.Repositories.Common;

namespace ShockAuto.Persistence.Repositories;

internal class CarCategoriesRepository(AppDbContext context) : BaseRepository<CarCategory, int>(context), ICarCategoriesRepository
{
    public async Task<IEnumerable<CarCategory>> GetAllCarCategories(CancellationToken cancellationToken = default)
    {
        return await _context.CarCategories.ToListAsync(cancellationToken);
    }
}