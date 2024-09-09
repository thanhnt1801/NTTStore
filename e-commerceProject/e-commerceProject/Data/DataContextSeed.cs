using System.IO;
using System.Reflection;
using System.Text.Json;

namespace e_commerceProject.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context, ILogger logger)
        {

            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            logger.LogInformation($"Path: {path}");
            if (!context.ProductBrands.Any())
            {
                var brandsData = File.ReadAllText(path + @"/Data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                foreach (var item in brands)
                {
                    context.ProductBrands.Add(item);
                }

                await context.SaveChangesAsync();
            }

            if (!context.ProductTypes.Any())
            {
                var typesData = File.ReadAllText(path + @"/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                foreach (var item in types)
                {
                    context.ProductTypes.Add(item);
                }

                await context.SaveChangesAsync();
            }

            if (!context.Products.Any())
            {
                var productsData = File.ReadAllText(path + @"/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                foreach (var item in products)
                {
                    context.Products.Add(item);
                }

                await context.SaveChangesAsync();
            }

            if (!context.DeliveryMethods.Any())
            {
                var deliveryData = File.ReadAllText(path + @"/Data/SeedData/delivery.json");
                var deliveries = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);

                foreach (var item in deliveries)
                {
                    context.DeliveryMethods.Add(item);
                }

                await context.SaveChangesAsync();
            }

        }
    }
}
