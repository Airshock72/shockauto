namespace ShockAuto.Application.Interfaces.Services;

public interface IPasswordHasher
{
    public string HashPassword(string password);
    public bool VerifyHashedPassword(string password, string hash);
}