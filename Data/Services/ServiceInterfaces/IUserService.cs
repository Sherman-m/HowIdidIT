using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface IUserService
{
    Task<User?> AddUser(UserDto userDto);
    Task<List<User>> GetUsers();
    Task<User?> GetUser(int id);
    Task<User?> GetUserByEmail(string email, string password);
    Task<User?> UpdateUser(int id, UserDto userDto);
    Task<bool> DeleteUser(int id);
}