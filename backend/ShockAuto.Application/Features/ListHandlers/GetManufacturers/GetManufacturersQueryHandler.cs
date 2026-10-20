using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.ListHandlers.GetManufacturers;

public class GetManufacturersQueryHandler : IRequestHandler<GetManufacturersQuery, Result>
{
    private static readonly int[] TopManufacturerIds = [40, 25, 3, 16, 14, 12, 77, 29, 2, 5];
    
    private readonly IManufacturerRepository _manufacturerRepository;

    public GetManufacturersQueryHandler(IManufacturerRepository manufacturerRepository)
    {
        _manufacturerRepository = manufacturerRepository;
    }


    public async ValueTask<Result> Handle(GetManufacturersQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Manufacturer> manufacturers = await _manufacturerRepository.GetAll(cancellationToken);

        GetManufacturersResponse response = new()
        {
            TopManufacturers = manufacturers
                .Where(m => TopManufacturerIds.Contains(m.Id))
                .OrderBy(m => Array.IndexOf(TopManufacturerIds, m.Id))
                .Select(ToManufacturerItem)
                .ToArray(),
            Manufacturers = manufacturers
                .Where(m => !TopManufacturerIds.Contains(m.Id))
                .OrderBy(m => m.Name)
                .Select(ToManufacturerItem)
                .ToArray()
        };
        
        return Result.Ok(response);
    }

    private static ManufacturerItem ToManufacturerItem(Manufacturer manufacturer) => new()
    {
        Id = manufacturer.Id,
        Name = manufacturer.Name
    };
}