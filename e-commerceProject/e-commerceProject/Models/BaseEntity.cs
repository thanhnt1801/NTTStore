using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace e_commerceProject
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}