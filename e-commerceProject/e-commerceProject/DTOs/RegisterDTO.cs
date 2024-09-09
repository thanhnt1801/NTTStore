using System.ComponentModel.DataAnnotations;

namespace e_commerceProject.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", 
            ErrorMessage = "Password must have 1 Uppercase, 1 lowercase, 1 number, 1 special character and at least 6 characters!")]
        public string Password { get; set; }
    }
}
