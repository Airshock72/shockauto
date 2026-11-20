using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using ShockAuto.Application.Interfaces.Services;
using ShockAuto.Services.Options;

namespace ShockAuto.Services.Services;

public class CloudinaryService : IFileStorageService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IOptions<CloudinaryOptions> options)
    {
        CloudinaryOptions settings = options.Value;
        Account account = new(settings.CloudName, settings.ApiKey, settings.ApiSecret);

        _cloudinary = new Cloudinary(account);
        _cloudinary.Api.Secure = true;
    }

    public async Task<UploadedFile> UploadImageAsync(string base64, string folder, CancellationToken cancellationToken = default)
    {
        // Expected format: "filename=1.png;data:image/png;base64,iVBORw0KGgo..."
        string[] parts = base64.Split(',', 2);
        if (parts.Length != 2)
            throw new FormatException("Invalid file format. Expected 'filename=...;data:image/...;base64,...'.");

        string[] headers = parts[0].Split(';');
        string? fileName = headers.FirstOrDefault(header => header.StartsWith("filename="))?["filename=".Length..];
        string? mimeType = headers.FirstOrDefault(header => header.StartsWith("data:"))?["data:".Length..];

        if (mimeType is null || !mimeType.StartsWith("image/"))
            throw new FormatException("Only image files are allowed.");

        byte[] bytes = Convert.FromBase64String(parts[1]);
        await using MemoryStream stream = new(bytes);

        ImageUploadParams uploadParams = new()
        {
            File = new FileDescription(string.IsNullOrWhiteSpace(fileName) ? Guid.NewGuid().ToString() : fileName, stream),
            Folder = folder,
        };

        ImageUploadResult result = await _cloudinary.UploadAsync(uploadParams, cancellationToken);
        if (result.Error is not null)
            throw new InvalidOperationException($"Cloudinary upload failed: {result.Error.Message}");

        return new UploadedFile(result.PublicId, result.SecureUrl.ToString());
    }

    public async Task<bool> DeleteAsync(string publicId, CancellationToken cancellationToken = default)
    {
        DeletionResult result = await _cloudinary.DestroyAsync(new DeletionParams(publicId));
        return result.Result == "ok";
    }
}
