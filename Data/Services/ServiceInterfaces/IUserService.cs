using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface IUserService
{
    Task<User?> AddUser(UserDto userDto);
    Task<List<User>> GetAllUsers();
    Task<User?> GetUserById(int id);
    Task<User?> GetUserByLogin(string login);
    Task<User?> AuthUser(UserDto userDto);
    Task<User?> UpdateUser(int id, UserDto userDto);
    Task<bool> DeleteUser(int id);
}