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
        IEnumerable<Manufacturer> manufacturers = await _manufacturerRepository.GetAll(cancellationToken);
        GetManufacturersResponse[] response = manufacturers.Select(m => new GetManufacturersResponse
            {
                Id = m.Id,
                Name = m.Name,
            }).OrderBy(m => m.Name).ToArray();
        
        return Result.Ok(response);
    }
}