using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface IMessageService
{
    Task<Message?> AddMessage(MessageDto messageDto);
    Task<List<Message>> GetMessages();
    Task<Message?> GetMessage(int id);
    Task<Message?> UpdateMessage(int id, MessageDto messageDto);
    Task<bool> DeleteMessage(int id);
}