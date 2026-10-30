using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Features.ListHandlers.CarCategories;

public record GetCarCategoriesQuery : IRequest<Result>;