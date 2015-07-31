using System.Threading;
using System.Threading.Tasks;
using Alps.Domain.Repository.Pattern.Infrastructure;
using Alps.Domain.Repository.Pattern.Repositories;

namespace Alps.Domain.Repository.Pattern.UnitOfWork
{
    public interface IUnitOfWorkAsync : IUnitOfWork
    {
        Task<int> SaveChangesAsync();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        IRepositoryAsync<TEntity> RepositoryAsync<TEntity>() where TEntity : class, IEntity;
    }
}