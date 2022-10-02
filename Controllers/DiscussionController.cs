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

    [HttpGet("GetAllDiscussions")]
    public async Task<ActionResult<IEnumerable<Discussion>>> GetAllDiscussions()
    {
        return await _discussionService.GetAllDiscussions();
    }
    
    [HttpGet("GetAllDiscussionsForTopic")]
    public async Task<ActionResult<IEnumerable<Discussion>>> GetAllDiscussionsForTopic(int topicId)
    {
        return await _discussionService.GetAllDiscussionsForTopic(topicId);
    }

    [HttpGet("GetDiscussionById")]
    public async Task<ActionResult<Discussion>> GetDiscussionById(int id)
    {
        var result = await _discussionService.GetDiscussionById(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }
    
    [HttpPost("AddDiscussion")]
    public async Task<ActionResult<Discussion>> AddDiscussion([FromBody] DiscussionDto discussionDto)
    {
        var result = await _discussionService.AddDiscussion(discussionDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPut("UpdateDiscussionById")]
    public async Task<ActionResult<Discussion>> UpdateDiscussionById(int id, [FromBody] DiscussionDto discussionDto)
    {
        var result = await _discussionService.UpdateDiscussionById(id, discussionDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete("DeleteDiscussionById")]
    public async Task<ActionResult> DeleteDiscussionById(int id)
    {
        var result = await _discussionService.DeleteDiscussionById(id);
        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }
}