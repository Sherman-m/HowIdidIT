using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DiscussionController : ControllerBase
{
    private readonly IDiscussionService _discussionService;

    public DiscussionController(IDiscussionService discussionService)
    {
        _discussionService = discussionService;
    }

    [HttpPost]
    public async Task<ActionResult<Discussion>> AddDiscussion([FromBody] DiscussionDto discussionDto)
    {
        var result = await _discussionService.AddDiscussion(discussionDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Discussion>>> GetDiscussions()
    {
        return await _discussionService.GetDiscussions();
    }
    
    [HttpGet("for_topic/{topicId}")]
    public async Task<ActionResult<IEnumerable<Discussion>>> GetDiscussionsByTopic(int topicId)
    {
        return await _discussionService.GetDiscussionsByTopic(topicId);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Discussion>> GetDiscussion(int id)
    {
        var result = await _discussionService.GetDiscussionById(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Discussion>> UpdateDiscussion(int id, [FromBody] DiscussionDto discussionDto)
    {
        var result = await _discussionService.UpdateDiscussion(id, discussionDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteDiscussion(int id)
    {
        var result = await _discussionService.DeleteDiscussion(id);
        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }
}