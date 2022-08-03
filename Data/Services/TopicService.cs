using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.Services;

public class TopicService
{
    private ForumContext _context;
    
    public async Task<Topic?> AddTopic(TopicDTO topicDto)
    {
        Topic topic = new Topic()
        {
            Name = topicDto.Name,
        };

        var result = _context.Topics.Add(topic);
        await _context.SaveChangesAsync();
        return await Task.FromResult(result.Entity);
    }

    public async Task<List<Topic>> GetTopics()
    {
        var result = await _context.Topics.ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<Topic?> GetTopic(int id)
    {
        var result = _context.Topics.FirstOrDefault(t => 
            t.TopicId == id);

        return await Task.FromResult(result);
    }

    public async Task<Topic?> UpdateTopic(int id, Topic updatedTopic)
    {
        var topic = await
            _context.Topics.FirstOrDefaultAsync(t => t.TopicId == id);
        if (topic != null)
        {
            topic.Name = updatedTopic.Name;

            _context.Topics.Update(topic);
            _context.Entry(topic).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return topic;
        }
        
        return null;
    }

    public async Task<bool> DeleteTopic(int id)
    {
        var topic = await _context.Topics.FirstOrDefaultAsync(t => t.TopicId == id);
        if (topic != null)
        {
            _context.Topics.Remove(topic);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
}