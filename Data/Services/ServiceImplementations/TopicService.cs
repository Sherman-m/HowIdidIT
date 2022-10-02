using HowIdidIT.Data.DBConfiguration;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.Services.ServiceImplementations;

public class TopicService : ITopicService
{
    private readonly ForumContext _context;

    public TopicService(ForumContext context)
    {
        _context = context;
    }

    public async Task<List<Topic>> GetAllTopics()
    {
        var result = await _context.Topics
            .Include(d => d.Discussions)
            .ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<Topic?> GetTopicById(int id)
    {
        var result = await _context.Topics
            .Include(d => d.Discussions)
            .FirstOrDefaultAsync(tid => tid.TopicId == id);
        return await Task.FromResult(result);
    }
    
    public async Task<Topic?> AddTopic(TopicDto topicDto)
    {
        var topic = new Topic()
        {
            Name = topicDto.Name,
            Description = topicDto.Description
        };

        try
        {
            var result = _context.Topics.Add(topic);
            await _context.SaveChangesAsync();
            return await Task.FromResult(result.Entity);
        }
        catch
        {
            return null;
        }
    }

    public async Task<Topic?> UpdateTopicById(int id, TopicDto topicDto)
    {
        var result = await _context.Topics.FirstOrDefaultAsync(tid => tid.TopicId == id);
        if (result != null)
        {
            result.Name = topicDto.Name;
            result.Description = topicDto.Description;
            result.LastModification = DateTime.UtcNow;

            try
            {
                _context.Topics.Update(result);
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

    public async Task<bool> DeleteTopicById(int id)
    {
        var result = await _context.Topics.FirstOrDefaultAsync(tid => tid.TopicId == id);
        if (result != null)
        {
            _context.Topics.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
}