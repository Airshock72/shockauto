namespace ShockAuto.Domain.Entities;

public class Model
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public bool IsTop { get; set; }
    public int ManufacturerId { get; set; }

    public virtual Manufacturer Manufacturer { get; set; } = null!;
}