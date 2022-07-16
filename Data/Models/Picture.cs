using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HowIdidIT.Data.Models;

public class Picture
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int PictureId { get; set; }
    public byte[] Image { get; set; }
    public User User { get; set; }
    public ICollection<Message> Messages { get; set; }
}