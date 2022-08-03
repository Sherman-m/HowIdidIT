using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.Services;

public class MessageService
{
    private ForumContext _context;
    
    public async Task<Message?> AddMessage(MessageDTO messageDto)
    {
        Message message = new Message
        {
            Text = messageDto.Text,
            UserId = messageDto.UserID,
            DiscussionId = messageDto.DiscussionID,
        };

        var result = _context.Messages.Add(message);
        await _context.SaveChangesAsync();
        return await Task.FromResult(result.Entity);
    }

    public async Task<List<Message>> GetMessages()
    {
        var result = await _context.Messages.ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<Message?> GetMessage(int id)
    {
        var result = _context.Messages.FirstOrDefault(m => 
            m.MessageId == id);

        return await Task.FromResult(result);
    }

    public async Task<Message?> UpdateMessage(int id, Message updatedMessage)
    {
        var message = await
            _context.Messages.FirstOrDefaultAsync(m => m.MessageId == id);
        if (message != null)
        {
            message.Text = updatedMessage.Text;

            _context.Messages.Update(message);
            _context.Entry(message).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return message;
        }
        
        return null;
    }

    public async Task<bool> DeleteMessage(int id)
    {
        var message = await _context.Messages.FirstOrDefaultAsync(m => m.MessageId == id);
        if (message != null)
        {
            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
    
}