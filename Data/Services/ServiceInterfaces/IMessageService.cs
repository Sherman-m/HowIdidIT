using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface IMessageService
{
    Task<List<Message>> GetAllMessages();
    Task<List<Message>> GetAllMessagesForDiscussion(int discussionId);
    Task<Message?> GetMessageById(int id);
    Task<Message?> AddMessage(MessageDto messageDto);
    Task<Message?> UpdateMessageById(int id, MessageDto messageDto);
    Task<Message?> UpdateMessageData(int id, string text);
    Task<bool> DeleteMessageById(int id);
}