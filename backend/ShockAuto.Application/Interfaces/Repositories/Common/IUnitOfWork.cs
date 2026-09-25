namespace ShockAuto.Application.Interfaces.Repositories.Common;

public interface IUnitOfWork
{
    Task Commit(CancellationToken cancellationToken);
}