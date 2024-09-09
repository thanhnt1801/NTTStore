using e_commerceProject.Data;
using e_commerceProject.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace e_commerceProject.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.Include(p => p.ProductBrand).Include(p => p.ProductType).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _context.Products.Include(p => p.ProductBrand).Include(p => p.ProductType).ToListAsync();

        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();

        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            var newProduct = new Product
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                ProductBrand = product.ProductBrand,
                ProductType = product.ProductType,
                ProductBrandId = product.ProductBrandId,
                ProductTypeId = product.ProductTypeId
            };

            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();

            return newProduct;
        }
        public async Task<Product> UpdateProductAsync(Product product)
        {
            var updatedProduct = await _context.Products.FindAsync(product.Id);
            updatedProduct.Name = product.Name;
            updatedProduct.Description = product.Description;
            updatedProduct.Price = product.Price;
            updatedProduct.PictureUrl = product.PictureUrl;
            updatedProduct.ProductBrand = product.ProductBrand;
            updatedProduct.ProductType = product.ProductType;
            updatedProduct.ProductTypeId = product.ProductTypeId;
            updatedProduct.ProductBrandId = product.ProductBrandId;

            _context.Products.Update(updatedProduct);
            await _context.SaveChangesAsync();

            return updatedProduct;
        }

    }
}
