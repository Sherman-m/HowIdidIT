using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("[controller]")]
[ApiController]
public class TopicController : ControllerBase
{
    private readonly ITopicService _topicService;

    public TopicController(ITopicService topicService)
    {
        _topicService = topicService;
    }

    [HttpPost]
    public async Task<ActionResult<Topic>> CreateTopic([FromBody] TopicDto topicDto)
    {
        var result = await _topicService.AddTopic(topicDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
    {
        return await _topicService.GetTopics();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Topic>> GetTopic(int id)
    {
        var result = await _topicService.GetTopic(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Topic>> UpdateTopic(int id,[FromBody] TopicDto topicDto)
    {
        var result = await _topicService.UpdateTopic(id, topicDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTopic(int id)
    {
        var result = await _topicService.DeleteTopic(id);
        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }

}