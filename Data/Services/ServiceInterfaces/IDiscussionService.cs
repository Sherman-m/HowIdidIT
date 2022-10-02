using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface IDiscussionService
{
    Task<List<Discussion>> GetAllDiscussions();
    Task<Discussion?> GetDiscussionById(int id);
    Task<List<Discussion>> GetAllDiscussionsForTopic(int topicId); 
    Task<Discussion?> AddDiscussion(DiscussionDto discussionDto);
    Task<Discussion?> UpdateDiscussionById(int id, DiscussionDto discussionDto);
    Task<bool> DeleteDiscussionById(int id);
}