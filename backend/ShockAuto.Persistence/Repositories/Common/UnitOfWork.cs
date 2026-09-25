using ShockAuto.Application.Interfaces.Repositories.Common;

namespace ShockAuto.Persistence.Repositories.Common;

internal class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    public async Task Commit(CancellationToken cancellationToken = default)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
}