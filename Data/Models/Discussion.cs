using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HowIdidIT.Data.Models;

public class Discussion
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int DiscussionId { get; set; }
    public string Name { get; set; }
    public string Question { get; set; }
    
    public int TopicId { get; set; }
    public Topic Topic { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; }
    
    public int CountOfMessages { get; set; }
    public DateTime DateOfCreating { get; set; }
    public DateTime LastModification { get; set; }
    
    public ICollection<Message> Messages { get; set; }
    
    public ICollection<User> SelectedUsers { get; set; }
}