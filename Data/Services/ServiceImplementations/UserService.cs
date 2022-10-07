using System.Security.Cryptography;
using System.Text;
using HowIdidIT.Data.DBConfiguration;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;

namespace HowIdidIT.Data.Services.ServiceImplementations;

public class UserService : IUserService
{
    private readonly ForumContext _context;

    public UserService(ForumContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetAllUsers()
    {
        var result = await _context.Users.ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<User?> GetUserById(int id)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .FirstOrDefaultAsync(u => u.UserId == id);
        return await Task.FromResult(result);
    }

    public async Task<User?> GetUserByLogin(string login)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .Include(st => st.SelectedTopics)
            .Include(sd => sd.SelectedDiscussions)
            .FirstOrDefaultAsync(u => u.Login == login);
        return await Task.FromResult(result);
    }
    
    public async Task<User?> AuthUser(UserDto userDto)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .FirstOrDefaultAsync(u => u.Login == userDto.Login);

        if (result == null) return null;
        
        var p = ComputeHmacSha1(
            Encoding.Default.GetBytes(userDto.Password + result.Salt),
            Encoding.Default.GetBytes("my_key")
        );
        
        if (p == result.Password)
        {
            return await Task.FromResult(result);
        }

        return null;
    }
    
    public async Task<User?> AddUser(UserDto userDto)
    {
        var salt = GenSalt();
        var user = new User()
        {
            Login = userDto.Login,
            Password = ComputeHmacSha1(
                Encoding.UTF8.GetBytes(userDto.Password + salt),
                Encoding.UTF8.GetBytes("my_key")
            ),
            Salt = salt,
        };

        try 
        {
            var result = _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return await Task.FromResult(result.Entity);
        }
        catch
        {
            return null;
        }
    }

    public async Task<User?> AddTopicToUser(int userId, int topicId)
    {
        var user = await _context.Users
            .Include(st => st.SelectedTopics)
            .FirstOrDefaultAsync(u => u.UserId == userId);
        
        var topic = await _context.Topics.FirstOrDefaultAsync(t => t.TopicId == topicId);

        if (user == null || topic == null) return null;
        
        if (user.SelectedTopics.Contains(topic))
            user.SelectedTopics.Remove(topic);
        else
            user.SelectedTopics.Add(topic);
            
        await _context.SaveChangesAsync();
        return await Task.FromResult(user);

    }
    
    public async Task<User?> AddDiscussionToUser(int userId, int discussionId)
    {
        var user = await _context.Users
            .Include(sd => sd.SelectedDiscussions)
            .FirstOrDefaultAsync(u => u.UserId == userId);
        
        var discussion = await _context.Discussions.FirstOrDefaultAsync(d => d.DiscussionId == discussionId);
        
        if (user == null || discussion == null) return null;

        if (user.SelectedDiscussions.Contains(discussion))
            user.SelectedDiscussions.Remove(discussion);
        else
            user.SelectedDiscussions.Add(discussion);
        
        await _context.SaveChangesAsync();
        return await Task.FromResult(user);

    }

    public async Task<User?> UpdateUserById(int id, UserDto userDto)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .FirstOrDefaultAsync(u => u.UserId == id);
        if (result == null) return null;
        
        var salt = GenSalt();
            
        result.Login = userDto.Login;
        result.Password = ComputeHmacSha1(
            Encoding.Default.GetBytes(userDto.Password + salt),
            Encoding.Default.GetBytes("my_key")
        );
        result.Salt = salt;

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

    public async Task<bool> DeleteUserById(int id)
    {
        var result = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (result == null) return false;
        
        _context.Users.Remove(result);
        await _context.SaveChangesAsync();
        return true;

    }
    
    private string ComputeHmacSha1(byte[] data, byte[] key)
    {
        using var hmac = new HMACSHA1(key);
        return Convert.ToBase64String(hmac.ComputeHash(data));
    }
    
    private string GenSalt()
    {
        var p = RandomNumberGenerator.Create();
        var salt = new byte[20];
        p.GetBytes(salt);
        return Convert.ToBase64String(salt);
    }
}