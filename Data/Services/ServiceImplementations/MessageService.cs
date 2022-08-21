﻿using HowIdidIT.Data.DBConfiguration;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.Services.ServiceImplementations;

public class MessageService : IMessageService
{
    private readonly ForumContext _context;

    public MessageService(ForumContext context)
    {
        _context = context;
    }

    public async Task<Message?> AddMessage(MessageDto messageDto)
    {
        var message = new Message()
        {
            Text = messageDto.Text,
            UserId = messageDto.UserId,
            DiscussionId = messageDto.DiscussionId
        };

        try
        {
            var result = _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return await Task.FromResult(result.Entity);
        }
        catch
        {
            return null;
        }
    }

    public async Task<List<Message>> GetMessages()
    {
        var result = await _context.Messages.ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<Message?> GetMessage(int id)
    {
        var result = await _context.Messages.FirstOrDefaultAsync(mid => mid.MessageId == id);
        return await Task.FromResult(result);
    }

    public async Task<Message?> UpdateMessage(int id, MessageDto messageDto)
    {
        var result = await _context.Messages.FirstOrDefaultAsync(mid => mid.MessageId == id);
        if (result != null)
        {
            result.Text = messageDto.Text;

            try
            {
                var m = _context.Messages.Update(result);
                await _context.SaveChangesAsync();
                return await Task.FromResult(m.Entity);
            }
            catch
            {
                return null;
            }
        }

        return null;
    }

    public async Task<bool> DeleteMessage(int id)
    {
        var result = await _context.Messages.FirstOrDefaultAsync(mid => mid.MessageId == id);
        if (result != null)
        {
            _context.Messages.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
}