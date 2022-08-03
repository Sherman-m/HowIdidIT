using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.Services;

public class DiscussionService
{
    private ForumContext _context;
    
    public async Task<Discussion?> AddDiscussion(DiscussionDTO discussionDto)
    {
        Discussion discussion = new Discussion
        {
            Name = discussionDto.Name,
            TopicId = discussionDto.TopicID
        };

        var result = _context.Discussions.Add(discussion);
        await _context.SaveChangesAsync();
        return await Task.FromResult(result.Entity);
    }

    public async Task<List<Discussion>> GetDiscussions()
    {
        var result = await _context.Discussions.ToListAsync();
        return await Task.FromResult(result);
    }

    public async Task<Discussion?> GetDiscussion(int id)
    {
        var result = _context.Discussions.FirstOrDefault(d => 
            d.DiscussionId == id);

        return await Task.FromResult(result);
    }

    public async Task<Discussion?> UpdateDiscussion(int id, Discussion updatedDiscussion)
    {
        var discussion = await
            _context.Discussions.FirstOrDefaultAsync(d => d.DiscussionId == id);
        if (discussion != null)
        {
            discussion.Name = updatedDiscussion.Name;
            discussion.TopicId = updatedDiscussion.TopicId;

            _context.Discussions.Update(discussion);
            _context.Entry(discussion).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return discussion;
        }
        
        return null;
    }

    public async Task<bool> DeleteDiscussion(int id)
    {
        var discussion = await _context.Discussions.FirstOrDefaultAsync(d => d.DiscussionId == id);
        if (discussion != null)
        {
            _context.Discussions.Remove(discussion);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
    
}