using HowIdidIT.Data.Models;


namespace HowIdidIT.Data.DTOs;

public class UserDto : User
{
    public int UserId { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public string? Description { get; set; }
}