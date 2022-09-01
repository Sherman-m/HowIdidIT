using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HowIdidIT.Data.Models;

public class TypeOfUser
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int TypeOfUserId { get; set; }
    [Column(TypeName = "varchar")]
    public string Name { get; set; }
    
    public ICollection<User> Users { get; set; }
}