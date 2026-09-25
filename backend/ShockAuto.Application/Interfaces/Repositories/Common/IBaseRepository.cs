using System.Linq.Expressions;

namespace ShockAuto.Application.Interfaces.Repositories.Common;

public interface IBaseRepository<T, in TKey> where T : class
{
    public Task<T?> Get(TKey id, CancellationToken cancellationToken = default);
    public Task<T?> Get(TKey id, CancellationToken cancellationToken = default, params Expression<Func<T, object?>>[] includes);
    
    public Task<List<T>> GetRange(IEnumerable<TKey> ids, CancellationToken cancellationToken = default);
    public Task<List<T>> GetRange(IEnumerable<TKey> ids, CancellationToken cancellationToken = default, params Expression<Func<T, object>>[] includes);
    
    public Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default);
    public Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default, params Expression<Func<T, object>>[] including);
    
    public Task Add(T entity, CancellationToken cancellationToken = default);
    public void Delete(T entity);
    public Task<bool> Exists(Expression<Func<T, bool>> expr, CancellationToken cancellationToken = default);
    public Task<int> Count(Expression<Func<T, bool>> expr, CancellationToken cancellationToken = default);
}