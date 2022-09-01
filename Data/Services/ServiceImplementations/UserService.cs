using System.Security.Cryptography;
using System.Text;
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
        var salt = GenSalt();
        User user = new User()
        {
            Email = userDto.Email,
            Nickname = userDto.Nickname,
            Password = ComputeHmacSha1(
                Encoding.UTF8.GetBytes(userDto.Password + salt),
                Encoding.UTF8.GetBytes("my_key")
                ),
            Salt = salt,
            TypeOfUserId = userDto.TypeOfUserId
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

    public async Task<List<User>> GetUsers()
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<User?> GetUser(int id)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .FirstOrDefaultAsync(uid => uid.UserId == id);
        return await Task.FromResult(result);
    }
    
    public async Task<User?> GetUserByEmail(string email, string password)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .FirstOrDefaultAsync(e => e.Email == email);

        if (result != null)
        {
            var p = ComputeHmacSha1(
                Encoding.Default.GetBytes(password + result.Salt),
                Encoding.Default.GetBytes("my_key")
            );
            Console.WriteLine(p.ToString());
            Console.WriteLine(result.Password);
            if (p == result.Password)
            {
                return await Task.FromResult(result);
            }
    }

        return null;
    }

    public async Task<User?> UpdateUser(int id, UserDto userDto)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .FirstOrDefaultAsync(uid => uid.UserId == id);
        if (result != null)
        {
            var salt = GenSalt();
            
            result.Nickname = userDto.Nickname;
            result.Email = userDto.Email;
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
    // Как бы это все разложить правильно
    private string ComputeHmacSha1(byte[] data, byte[] key)
    {
        using (var hmac = new HMACSHA1(key))
        {
            return Convert.ToBase64String(hmac.ComputeHash(data));
        }
    }
    
    private string GenSalt()
    {
        RandomNumberGenerator p = RandomNumberGenerator.Create();
        var salt = new byte[20];
        p.GetBytes(salt);
        return Convert.ToBase64String(salt);
    }
}