using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Interfaces.Repositories;

public interface IUserRepository : IBaseRepository<User, Guid>
{
    public new Task<User?> Get(Guid id, CancellationToken cancellationToken = default);
    public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
}