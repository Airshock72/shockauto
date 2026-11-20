using ShockAuto.Domain.Entities.Common;

namespace ShockAuto.Domain.Entities;

public class ApplicationImage : AuditableEntity
{
    public int Id { get; set; }

    public required Guid ApplicationId { get; set; }
    public virtual Application Application { get; set; } = null!;

    public required string PublicId { get; set; } // Cloudinary public_id (needed for delete)
    public required string Url { get; set; }      // Cloudinary secure_url
    public required int Order { get; set; }       // 0 = main/cover image
}
