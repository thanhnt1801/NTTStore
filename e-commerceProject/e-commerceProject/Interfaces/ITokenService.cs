using e_commerceProject.Entities.Identity;

namespace e_commerceProject.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
