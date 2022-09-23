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

    [HttpPost]
    public async Task<ActionResult<Message>> AddMessage([FromBody] MessageDto messageDto)
    {
        var result = await _messageService.AddMessage(messageDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
    {
        return await _messageService.GetMessages();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Message>> GetMessage(int id)
    {
        var result = await _messageService.GetMessage(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Message>> UpdateMessage(int id, MessageDto messageDto)
    {
        var result = await _messageService.UpdateMessage(id, messageDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        var result = await _messageService.DeleteMessage(id);
        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }
}