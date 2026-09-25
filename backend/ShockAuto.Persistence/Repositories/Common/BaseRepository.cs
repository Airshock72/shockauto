using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ShockAuto.Application.Interfaces.Repositories.Common;

namespace ShockAuto.Persistence.Repositories.Common;

internal abstract class BaseRepository<T, TKey>(AppDbContext context) : IBaseRepository<T, TKey> where T: class
{
    protected readonly AppDbContext _context = context;
    
    public async Task<T?> Get(TKey id, CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>().FindAsync([id], cancellationToken);
    }
    
    public async Task<T?> Get(TKey id, CancellationToken cancellationToken = default, params Expression<Func<T, object?>>[] includes)
    {
        IQueryable<T> query = _context.Set<T>().AsQueryable();
        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        return await query.FirstOrDefaultAsync(e => EF.Property<TKey>(e, "Id")!.Equals(id), cancellationToken: cancellationToken);
    }
    
    public async Task<List<T>> GetRange(IEnumerable<TKey> ids, CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>()
            .Where(e => ids.Contains(EF.Property<TKey>(e, "Id")))
            .ToListAsync(cancellationToken: cancellationToken);
    }
    
    public async Task<List<T>> GetRange(IEnumerable<TKey> ids, CancellationToken cancellationToken = default, params Expression<Func<T, object>>[] includes)
    {
        IQueryable<T> query = _context.Set<T>().AsQueryable();
        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        query = query.Where(e => ids.Contains(EF.Property<TKey>(e, "Id")));
        return await query.ToListAsync(cancellationToken: cancellationToken);
    }
    
    public async Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>().ToListAsync(cancellationToken: cancellationToken);
    }
    
    public async Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default, params Expression<Func<T, object>>[] includes)
    {
        IQueryable<T> query = _context.Set<T>().AsQueryable();
        includes.ToList().ForEach(include => { query = query.Include(include); });
        return await query.ToListAsync(cancellationToken);
    }
    
    public async Task Add(T model, CancellationToken cancellationToken = default)
    {
        await _context.Set<T>().AddAsync(model, cancellationToken);
    }
    
    public void Delete(T model)
    {
        _context.Set<T>().Remove(model);
    }
    
    public async Task<bool> Exists(Expression<Func<T, bool>> expr, CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>().AnyAsync(expr, cancellationToken: cancellationToken);
    }
    
    public virtual async Task<int> Count(Expression<Func<T, bool>> expr, CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>().CountAsync(expr, cancellationToken);
    }
}