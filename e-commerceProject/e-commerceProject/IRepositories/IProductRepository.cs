namespace e_commerceProject.IRepositories
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(int id);  
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
        Task<Product> CreateProductAsync(Product product);
        Task<Product> UpdateProductAsync(Product product);

    }
}
