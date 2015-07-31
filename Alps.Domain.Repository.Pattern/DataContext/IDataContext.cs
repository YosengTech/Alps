using System;
using Alps.Domain.Repository.Pattern.Infrastructure;

namespace Alps.Domain.Repository.Pattern.DataContext
{
    public interface IDataContext : IDisposable
    {
        int SaveChanges();
        void SyncObjectState<TEntity>(TEntity entity) where TEntity : class,IEntity;
        void SyncObjectsStatePostCommit();
    }
}