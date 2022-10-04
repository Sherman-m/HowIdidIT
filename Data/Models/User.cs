using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HowIdidIT.Data.Models;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int UserId { get; set; }
    [Column(TypeName = "varchar")]
    public string Login { get; set; }
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
    
    public ICollection<Topic> SelectedTopics { get; set; }
    public ICollection<Discussion> SelectedDiscussions { get; set; }
}