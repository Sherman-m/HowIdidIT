using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface ITopicService
{
    Task<List<Topic>> GetAllTopics();
    Task<Topic?> GetTopicById(int id);
    Task<Topic?> AddTopic(TopicDto topicDto);
    Task<Topic?> UpdateTopicById(int id, TopicDto topicDto);
    Task<bool> DeleteTopicById(int id);
}