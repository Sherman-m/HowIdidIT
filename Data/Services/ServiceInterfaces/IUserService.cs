using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface IUserService
{
    Task<List<User>> GetAllUsers();
    Task<User?> GetUserById(int id);
    Task<User?> GetUserByLogin(string login);
    Task<User?> GetAuthUser(int id);
    Task<User?> UserLogin(UserDto userDto);
    Task<User?> AddUser(UserDto userDto);
    Task<User?> AddTopicToUser(int userId, int topicId);
    Task<User?> AddDiscussionToUser(int userId, int discussionId);
    Task<User?> UpdateUserById(int id, UserDto userDto);
    Task<User?> UpdateUserLoginOrDescription(int userId, string login, string description);
    Task<User?> UpdateUserPassword(int id, string oldPassword, string newPassword);
    Task<User?> RecoverUserPassword(int id, string password);
    Task<bool> DeleteUserById(int id);
}