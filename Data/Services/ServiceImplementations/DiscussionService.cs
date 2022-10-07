﻿using HowIdidIT.Data.DBConfiguration;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.Services.ServiceImplementations;

public class DiscussionService : IDiscussionService
{
    private readonly ForumContext _context;

    public DiscussionService(ForumContext context)
    {
        _context = context;
    }

    public async Task<List<Discussion>> GetAllDiscussions()
    {
        var result = await _context.Discussions
            .Include(t => t.Topic)
            .Include(u => u.User)
            .ToListAsync();
        return await Task.FromResult(result);
    }
    
    public async Task<List<Discussion>> GetAllDiscussionsForTopic(int topicId)
    {
        var result = await _context.Discussions
            .Include(t => t.Topic)
            .Include(u => u.User)
            .Where(t => t.TopicId == topicId)
            .ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<Discussion?> GetDiscussionById(int id)
    {
        var result = await _context.Discussions
            .Include(t => t.Topic)
            .Include(u => u.User)
            .Include(m => m.Messages)
            .FirstOrDefaultAsync(mid => mid.DiscussionId == id);
        return await Task.FromResult(result);
    }

    public async Task<Discussion?> AddDiscussion(DiscussionDto discussionDto)
    {
        var discussion = new Discussion()
        {
            Name = discussionDto.Name,
            TopicId = discussionDto.TopicId,
            UserId = discussionDto.UserId
        };

        try
        {
            var result = _context.Discussions.Add(discussion);
            await _context.SaveChangesAsync();
            return await Task.FromResult(result.Entity);
        }
        catch
        {
            return null;
        }
    }

    public async Task<Discussion?> UpdateDiscussionById(int id, DiscussionDto discussionDto)
    {
        var result = await _context.Discussions.FirstOrDefaultAsync(mid => mid.DiscussionId == id);
        if (result != null)
        {
            result.Name = discussionDto.Name;
            result.TopicId = discussionDto.TopicId;

            try
            {
                var m = _context.Discussions.Update(result);
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

    public async Task<bool> DeleteDiscussionById(int id)
    {
        var result = await _context.Discussions.FirstOrDefaultAsync(mid => mid.DiscussionId == id);
        if (result != null)
        {
            _context.Discussions.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
}