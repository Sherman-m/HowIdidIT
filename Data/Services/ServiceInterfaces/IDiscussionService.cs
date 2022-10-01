using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface IDiscussionService
{
    Task<Discussion?> AddDiscussion(DiscussionDto discussionDto);
    Task<List<Discussion>> GetDiscussions();
    Task<Discussion?> GetDiscussionById(int id);
    Task<List<Discussion>> GetDiscussionsByTopic(int id); 
    Task<Discussion?> UpdateDiscussion(int id, DiscussionDto discussionDto);
    Task<bool> DeleteDiscussion(int id);
}