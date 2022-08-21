using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HowIdidIT.Data.Models;

public class Message
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int MessageId { get; set; }
    public string Text { get; set; }
    public int UserId { get; set; }
    public int DiscussionId { get; set; }
    public DateTime DateOfPublication { get; set; }
    public DateTime LastModification { get; set; }
    public ICollection<Picture> Pictures { get; set; }
    
}