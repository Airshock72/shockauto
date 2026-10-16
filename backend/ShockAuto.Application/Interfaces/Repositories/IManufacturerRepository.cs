using ShockAuto.Application.Interfaces.Repositories.Common;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Interfaces.Repositories;

public interface IManufacturerRepository : IBaseRepository<Manufacturer, int>
{
    public Task<Manufacturer?> GetManufacturerByName(string manufacturerName, CancellationToken cancellationToken);
}