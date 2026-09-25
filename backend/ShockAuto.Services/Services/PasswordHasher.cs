using ShockAuto.Application.Interfaces.Services;

namespace ShockAuto.Services.Services;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyHashedPassword(string hashedPassword, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(hashedPassword, hash);
    }
}