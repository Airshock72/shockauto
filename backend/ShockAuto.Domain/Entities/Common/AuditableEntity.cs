namespace ShockAuto.Domain.Entities.Common;

public abstract class AuditableEntity
{
    public virtual DateTime DateCreated { get; set; } = DateTime.Now;
    public virtual DateTime? DateModified { get; set; }
}