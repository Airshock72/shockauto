using ShockAuto.Domain.Entities;
namespace ShockAuto.Application.Interfaces.Repositories.Common;

public interface IUserRepository : IBaseRepository<User, Guid>
{
    public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
}