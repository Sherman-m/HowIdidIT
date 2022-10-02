using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface IUserService
{
    Task<List<User>> GetAllUsers();
    Task<User?> GetUserById(int id);
    Task<User?> GetUserByLogin(string login);
    Task<User?> AuthUser(UserDto userDto);
    Task<User?> AddUser(UserDto userDto);
    Task<User?> UpdateUserById(int id, UserDto userDto);
    Task<bool> DeleteUserById(int id);
}