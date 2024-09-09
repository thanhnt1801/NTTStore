using e_commerceProject.Specifications;

namespace e_commerceProject.IRepositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        Task<int> CountAsync(ISpecification<T> spec);
        void Add(T entity); // we don't use Asynchronous because this method just track the entity that we want to save to the DB.
        void Update(T entity);
        void Delete(T entity);
    }
}
