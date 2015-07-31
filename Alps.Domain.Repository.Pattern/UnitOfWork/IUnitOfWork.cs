using System;
using System.Data;
using Alps.Domain.Repository.Pattern.Repositories;
using Alps.Domain.Repository.Pattern.Infrastructure;

namespace Alps.Domain.Repository.Pattern.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        int SaveChanges();
        void Dispose(bool disposing);
        IRepository<TEntity> Repository<TEntity>() where TEntity : class,IEntity;
        void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.Unspecified);
        bool Commit();
        void Rollback();
    }
}