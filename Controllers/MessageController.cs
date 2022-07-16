using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly MessageService _context;

    public MessageController(MessageService context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
    {
        return await _context.GetMessages();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Message>> GetMessage(int id)
    {
        var message = await _context.GetMessage(id);

        if (message == null)
        {
            return NotFound();
        }

        return message;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Message>> PutMessage(int id, [FromBody] Message message)
    {
        var result = await _context.UpdateMessage(id, message);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Message>> PostMessage([FromBody] MessageDTO messageDto)
    {
        var result = await _context.AddMessage(messageDto);
        if (result == null)
        {
            BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var message = await _context.DeleteMessage(id);
        if (message)
        {
            return Ok();
        }

        return BadRequest();
    }
}