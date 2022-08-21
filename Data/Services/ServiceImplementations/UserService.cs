using HowIdidIT.Data.DBConfiguration;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.Services.ServiceImplementations;

public class UserService : IUserService
{
    private ForumContext _context;

    public UserService(ForumContext context)
    {
        _context = context;
    }

    public async Task<User?> AddUser(UserDto userDto)
    {
        User user = new User()
        {
            Email = userDto.Email,
            Nickname = userDto.Nickname,
            Password = userDto.Password,
        };
        var result = _context.Users.Add(user);
        
        try 
        {
            await _context.SaveChangesAsync();
            return await Task.FromResult(result.Entity);
        }
        catch
        {
            return null;
        }
    }

    public async Task<List<User>> GetUsers()
    {
        var result = await _context.Users.ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<User?> GetUser(int id)
    {
        var result = await _context.Users.FirstOrDefaultAsync(uid => uid.UserId == id);
        return await Task.FromResult(result);
    }

    public async Task<User?> UpdateUser(int id, UserDto userDto)
    {
        var result = await _context.Users.FirstOrDefaultAsync(uid => uid.UserId == id);
        if (result != null)
        {
            result.Nickname = userDto.Nickname;
            result.Email = userDto.Email;
            result.Password = userDto.Password;

            try
            {
                _context.Users.Update(result);
                _context.Entry(result).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return await Task.FromResult(result);
            }
            catch
            {
                return null;
            }
        }

        return null;
    }

    public async Task<bool> DeleteUser(int id)
    {
        var result = await _context.Users.FirstOrDefaultAsync(uid => uid.UserId == id);
        if (result != null)
        {
            _context.Users.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
}