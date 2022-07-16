using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TopicController : ControllerBase
{
    private readonly TopicService _context;

    public TopicController(TopicService context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
    {
        return await _context.GetTopics();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Topic>> GetTopic(int id)
    {
        var topic = await _context.GetTopic(id);

        if (topic == null)
        {
            return NotFound();
        }

        return topic;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Topic>> PutTopic(int id, [FromBody] Topic topic)
    {
        var result = await _context.UpdateTopic(id, topic);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Topic>> PostTopic([FromBody] TopicDTO topicDto)
    {
        var result = await _context.AddTopic(topicDto);
        if (result == null)
        {
            BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteTopic(int id)
    {
        var topic = await _context.DeleteTopic(id);
        if (topic)
        {
            return Ok();
        }

        return BadRequest();
    }
}