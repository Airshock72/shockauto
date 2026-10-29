using Microsoft.EntityFrameworkCore;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;
using ShockAuto.Persistence.Repositories.Common;

namespace ShockAuto.Persistence.Repositories;

internal class GasolineTypeRepository(AppDbContext context) : BaseRepository<GasolineType, int>(context), IGasolineTypesRepository
{
    public async Task<IEnumerable<GasolineType>> GetAllGasolineTypes(CancellationToken cancellationToken)
    {
        return await _context.GasolineTypes.ToListAsync(cancellationToken);
    }
}