using e_commerceProject.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace e_commerceProject.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindUserByClaimsPrincipleWithAddress(this UserManager<AppUser> userManager,
            ClaimsPrincipal userClaims)
        {
            var email = userClaims.FindFirstValue(ClaimTypes.Email);
            return await userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimsPrincipal(this UserManager<AppUser> userManager,
            ClaimsPrincipal userClaims)
        {
            return await userManager.Users.SingleOrDefaultAsync(x => x.Email == userClaims.FindFirstValue(ClaimTypes.Email));
        }
    }
}
