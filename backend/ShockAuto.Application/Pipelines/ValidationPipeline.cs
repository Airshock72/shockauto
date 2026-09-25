using FluentValidation;
using FluentValidation.Results;
using Mediator;
using ShockAuto.Application.Common;

namespace ShockAuto.Application.Pipelines;

public class ValidationPipeline<TMessage, TResponse> : IPipelineBehavior<TMessage, TResponse> where TResponse : Result where TMessage : IMessage
{
    private readonly IValidator<TMessage>? _validator;

    public ValidationPipeline(IEnumerable<IValidator<TMessage>> validators)
    {
        _validator = validators.SingleOrDefault();
    }

    public async ValueTask<TResponse> Handle(TMessage request, MessageHandlerDelegate<TMessage, TResponse> next, CancellationToken cancellationToken)
    {
        if (_validator == null)
            return await next(request, cancellationToken);
        
        ValidationResult validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (validationResult.IsValid)
            return await next(request, cancellationToken);

        var errors = validationResult.Errors.Select(x => new
        {
            x.PropertyName, x.ErrorMessage
        });

        Result result = new(errors, 400);
        return (TResponse)result;
    }
}