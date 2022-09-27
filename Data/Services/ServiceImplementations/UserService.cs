﻿using System.Security.Cryptography;
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

    public async Task<List<User>> GetAllUsers()
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<User?> GetUserById(int id)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .FirstOrDefaultAsync(u => u.UserId == id);
        return await Task.FromResult(result);
    }

    public async Task<User?> GetUserByLogin(string login)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .FirstOrDefaultAsync(u => u.Login == login);
        return await Task.FromResult(result);
    }
    
    public async Task<User?> AuthUser(UserDto userDto)
    {
        var result = await _context.Users
            .Include(t => t.TypeOfUser)
            .Include(d => d.Discussions)
            .Include(m => m.Messages)
            .FirstOrDefaultAsync(u => u.Login == userDto.Login);

        if (result != null)
        {
            var p = ComputeHmacSha1(
                Encoding.Default.GetBytes(userDto.Password + result.Salt),
                Encoding.Default.GetBytes("my_key")
            );
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
            .FirstOrDefaultAsync(u => u.UserId == id);
        if (result != null)
        {
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

        return null;
    }

    public async Task<bool> DeleteUser(int id)
    {
        var result = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (result != null)
        {
            _context.Users.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
    
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