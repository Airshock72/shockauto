using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.ListHandlers.GetManufacturers;

public class GetManufacturersQueryHandler : IRequestHandler<GetManufacturersQuery, Result>
{
    private readonly IManufacturerRepository _manufacturerRepository;

    public GetManufacturersQueryHandler(IManufacturerRepository manufacturerRepository)
    {
        _manufacturerRepository = manufacturerRepository;
    }


    public async ValueTask<Result> Handle(GetManufacturersQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Manufacturer> topManufacturers = await _manufacturerRepository.GetManufacturers(true, cancellationToken);
        IEnumerable<Manufacturer> manufacturers = await _manufacturerRepository.GetManufacturers(false, cancellationToken);

        GetManufacturersResponse response = new()
        {
            TopManufacturers = topManufacturers.Select(ToManufacturerItem).ToArray(),
            Manufacturers = manufacturers.Select(ToManufacturerItem).ToArray()
        };
        
        return Result.Ok(response);
    }

    private static ManufacturerItem ToManufacturerItem(Manufacturer manufacturer) => new()
    {
        Id = manufacturer.Id,
        Name = manufacturer.Name
    };
}