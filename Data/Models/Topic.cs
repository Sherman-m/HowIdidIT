using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HowIdidIT.Data.Models;

public class Topic
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int TopicId { get; set; }
    public string Name { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; }
    
    public int CountOfDiscussing { get; set; }
    public string Description { get; set; }
    public DateTime DateOfCreating { get; set; }
    public DateTime LastModification { get; set; }
    
    public ICollection<Discussion> Discussions { get; set; }
    
    public ICollection<User> SelectedUsers { get; set; }
}