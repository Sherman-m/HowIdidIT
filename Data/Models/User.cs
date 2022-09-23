using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HowIdidIT.Data.Models;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int UserId { get; set; }
    public string? Nickname { get; set; }
    [Column(TypeName = "varchar")]
    public string Email { get; set; }
    [Column(TypeName = "varchar")]
    public string Password { get; set; }
    public string Salt { get; set; }
    public int? PictureId { get; set; }
    public string? Description { get; set; }
    public DateTime DateOfRegistration { get; set; }
    
    public int TypeOfUserId { get; set; }
    public TypeOfUser TypeOfUser { get; set; }
    
    public ICollection<Discussion> Discussions { get; set; }
    public ICollection<Message> Messages { get; set; }
}