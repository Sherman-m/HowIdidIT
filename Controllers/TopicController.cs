using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TopicController : ControllerBase
{
    private readonly ITopicService _topicService;

    public TopicController(ITopicService topicService)
    {
        _topicService = topicService;
    }

    [HttpGet("GetAllTopics")]
    public async Task<ActionResult<IEnumerable<Topic>>> GetAllTopics()
    {
        return await _topicService.GetAllTopics();
    }

    [HttpGet("GetTopicById")]
    public async Task<ActionResult<Topic>> GetTopicById(int id)
    {
        var result = await _topicService.GetTopicById(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }
    
    [HttpPost("CreateTopic")]
    public async Task<ActionResult<Topic>> CreateTopic([FromBody] TopicDto topicDto)
    {
        var result = await _topicService.AddTopic(topicDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPut("UpdateTopicById")]
    public async Task<ActionResult<Topic>> UpdateTopicById(int id,[FromBody] TopicDto topicDto)
    {
        var result = await _topicService.UpdateTopicById(id, topicDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete("DeleteTopicById")]
    public async Task<ActionResult> DeleteTopicById(int id)
    {
        var result = await _topicService.DeleteTopicById(id);
        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }

}