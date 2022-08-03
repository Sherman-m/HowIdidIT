using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.Services;

public class UserService
{
    private ForumContext _context;

    public UserService(ForumContext context)
    {
        _context = context;
    }

    public async Task<User?> AddUser(UserDTO userDto)
    {
        User user = new User
        {
            Nickname = userDto.Nickname,
            Email = userDto.Email,
            Password = userDto.Password
        };

        var result = _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return await Task.FromResult(result.Entity);
    }

    public async Task<List<User>> GetUsers()
    {
        var result = await _context.Users.ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<User?> GetUser(int id)
    {
        var result = _context.Users.FirstOrDefault(u => 
            u.UserId == id);

        return await Task.FromResult(result);
    }

    public async Task<User?> UpdateUser(int id, User updatedUser)
    {
        var user = await
            _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (user != null)
        {
            user.Nickname = updatedUser.Nickname;
            user.Email = updatedUser.Email;
            user.Password = updatedUser.Password;
            user.PictureId = updatedUser.PictureId;
            user.Description = updatedUser.Description;
            
            _context.Users.Update(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return user;
        }
        
        return null;
    }

    public async Task<bool> DeleteUser(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
    
}