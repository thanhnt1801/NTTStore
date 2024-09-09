using e_commerceProject.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.IO;
using System.Reflection;

namespace e_commerceProject.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, ILogger logger)
        {
            if (!userManager.Users.Any())
            {
                var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                logger.LogInformation($"Path: {path}");
                var user = new AppUser
                {
                    DisplayName = "Thanh",
                    Email = "thanh@gmail.com",
                    UserName = "thanh@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Thanh",
                        LastName = "Nguyen",
                        Street = "10",
                        City = "Soc Trang",
                        State = "Soc Trang",
                        ZipCode = "90210"
                    }
                };

                var result = await userManager.CreateAsync(user, "Passw0rd@");
                if (result.Succeeded)
                {
                    logger.LogInformation("User created successfully");
                }
                else
                {
                    logger.LogError("User creation failed: {Errors}", string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}
