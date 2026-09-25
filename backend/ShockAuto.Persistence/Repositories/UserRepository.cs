using Microsoft.EntityFrameworkCore;
using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Domain.Entities;
using ShockAuto.Persistence.Repositories.Common;

namespace ShockAuto.Persistence.Repositories;

internal class UserRepository(AppDbContext context) : BaseRepository<User, Guid>(context), IUserRepository
{
    public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower(), cancellationToken);
    }
}