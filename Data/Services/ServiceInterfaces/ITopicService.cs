using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface ITopicService
{
    Task<Topic?> AddTopic(TopicDto topicDto);
    Task<List<Topic>> GetTopics();
    Task<Topic?> GetTopic(int id);
    Task<Topic?> UpdateTopic(int id, TopicDto topicDto);
    Task<bool> DeleteTopic(int id);
}