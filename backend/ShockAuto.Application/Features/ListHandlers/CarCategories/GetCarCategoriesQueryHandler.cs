using Mediator;
using ShockAuto.Application.Common;
using ShockAuto.Application.Interfaces.Repositories;
using ShockAuto.Domain.Entities;

namespace ShockAuto.Application.Features.ListHandlers.CarCategories;

public class GetCarCategoriesQueryHandler : IRequestHandler<GetCarCategoriesQuery, Result>
{
    private readonly ICarCategoriesRepository _carCategoriesRepository;

    public GetCarCategoriesQueryHandler(ICarCategoriesRepository carCategoriesRepository)
    {
        _carCategoriesRepository = carCategoriesRepository;
    }

    public async ValueTask<Result> Handle(GetCarCategoriesQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<CarCategory> carCategories = await _carCategoriesRepository.GetAllCarCategories(cancellationToken);

        GetCarCategoriesResponse[] response = carCategories
            .Select(x => new GetCarCategoriesResponse
            {
                Id = x.Id,
                Name = x.Name,
                NameKa = x.NameKa
            })
            .OrderBy(x => x.Name).ToArray();

        return Result.Ok(response);
    }
}