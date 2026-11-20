namespace ShockAuto.Application.Interfaces.Services;

public record UploadedFile(string PublicId, string Url);

public interface IFileStorageService
{
    public Task<UploadedFile> UploadImageAsync(string base64, string folder, CancellationToken cancellationToken = default);
    public Task<bool> DeleteAsync(string publicId, CancellationToken cancellationToken = default);
}
