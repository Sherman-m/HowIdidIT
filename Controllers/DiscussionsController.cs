using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceImplementations;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DiscussionsController : ControllerBase
{
    private readonly IDiscussionService _discussionService;

    public DiscussionsController(IDiscussionService discussionService)
    {
        _discussionService = discussionService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Discussion>>> GetAllDiscussions()
    {
        return await _discussionService.GetAllDiscussions();
    }

    [HttpGet("{discussionId:int}/messages")]
    public async Task<ActionResult<IEnumerable<Message>>> GetAllMessagesForDiscussion(int discussionId,
        [FromServices] IMessageService messageService)
    {
        return await messageService.GetAllMessagesForDiscussion(discussionId);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Discussion>> GetDiscussionById(int id)
    {
        var result = await _discussionService.GetDiscussionById(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
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

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Discussion>> UpdateDiscussionById(int id, [FromBody] DiscussionDto discussionDto)
    {
        var result = await _discussionService.UpdateDiscussionById(id, discussionDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete("{id:int}")]
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