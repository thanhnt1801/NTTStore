using e_commerceProject.Interfaces;
using e_commerceProject.IRepositories;
using e_commerceProject.Repositories;
using System.Collections;

namespace e_commerceProject.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _dataContext;
        private Hashtable _repositories;
        public UnitOfWork(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<int> Complete()
        {
            return await _dataContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dataContext.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if( _repositories == null ) _repositories = new Hashtable();

            var type = typeof(TEntity).Name;

            if(!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _dataContext);

                _repositories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>) _repositories[type];
        }
    }
}
