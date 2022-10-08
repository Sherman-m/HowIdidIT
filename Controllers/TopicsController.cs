using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TopicsController : ControllerBase
{
    private readonly ITopicService _topicService;

    public TopicsController(ITopicService topicService)
    {
        _topicService = topicService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Topic>>> GetAllTopics()
    {
        return await _topicService.GetAllTopics();
    }
    
    [HttpGet("{topicId:int}/discussions")]
    public async Task<ActionResult<IEnumerable<Discussion>>> GetAllDiscussionsForTopic(int topicId,
        [FromServices] IDiscussionService discussionService)
    {
        return await discussionService.GetAllDiscussionsForTopic(topicId);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Topic>> GetTopicById(int id)
    {
        var result = await _topicService.GetTopicById(id);
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
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

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Topic>> UpdateTopicById(int id,[FromBody] TopicDto topicDto)
    {
        var result = await _topicService.UpdateTopicById(id, topicDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPut("{id:int}/edit")]
    public async Task<ActionResult<Topic>> UpdateDataTopic(int id, JObject jObject)
    {
        var bodyRequest = jObject.ToObject<Dictionary<string, string>>();
        if (bodyRequest == null) return BadRequest();

        var result = 
            await _topicService.UpdateTopicData(id, bodyRequest["name"], bodyRequest["description"]);
        if (result == null) return BadRequest();

        return Ok(result);
    }

    [HttpDelete("{id:int}")]
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