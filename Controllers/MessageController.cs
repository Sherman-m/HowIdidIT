using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;

    public MessageController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpGet("GetAllMessages")]
    public async Task<ActionResult<IEnumerable<Message>>> GetAllMessages()
    {
        return await _messageService.GetAllMessages();
    }

    [HttpGet("GetMessageById")]
    public async Task<ActionResult<Message>> GetMessageById(int id)
    {
        var result = await _messageService.GetMessageById(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }
    
    [HttpPost("AddMessage")]
    public async Task<ActionResult<Message>> AddMessage([FromBody] MessageDto messageDto)
    {
        var result = await _messageService.AddMessage(messageDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPut("UpdateMessageById")]
    public async Task<ActionResult<Message>> UpdateMessageById(int id, MessageDto messageDto)
    {
        var result = await _messageService.UpdateMessageById(id, messageDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }
    
    [HttpDelete("DeleteUserById")]
    public async Task<ActionResult> DeleteUserById(int id)
    {
        var result = await _messageService.DeleteMessageById(id);
        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }
}