using System.Security.Claims;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        return await _userService.GetAllUsers();
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var result = await _userService.GetUserById(id);
        if (result == null) return NotFound();
        
        return Ok(result);
    }

    [Authorize]
    [HttpGet("auth")]
    public async Task<ActionResult<User>> GetAuthUser()
    {
        var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userId == null) return NotFound();
        
        var result = await _userService.GetAuthUser(Convert.ToInt32(userId.Value));
        if (result == null) return NotFound();
        
        return Ok(result);
    }
    
    [HttpPost("registration")]
    public async Task<ActionResult<User>> RegisterUser([FromBody] UserDto userDto)
    {
        var result = await _userService.AddUser(userDto);
        if (result == null) return BadRequest();
        
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<User>> UserLogin([FromBody] UserDto userDto, 
        [FromServices] ITokenService tokenService)
    {
        var result = await _userService.UserLogin(userDto);
        if (result == null) return Unauthorized();
        
        tokenService.CreateJwtToken(HttpContext, result);
        return Ok(result);

    }
    
    [Authorize]
    [HttpPut("{userId:int}/selected-topics/{topicId:int}")]
    public async Task<ActionResult<User>> AddTopicToUser(int userId, int topicId)
    {
        var result = await _userService.AddTopicToUser(userId, topicId);
        if (result == null) return BadRequest();

        return Ok(result);
    }
    
    [Authorize]
    [HttpPut("{userId:int}/selected-discussions/{discussionId:int}")]
    public async Task<ActionResult<User>> AddDiscussionToUser(int userId, int discussionId)
    {
        var result = await _userService.AddDiscussionToUser(userId, discussionId);
        if (result == null) return BadRequest();

        return Ok(result);
    }

    [Authorize]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<User>> UpdateUserById(int id, [FromBody] UserDto userDto,
        [FromServices] ITokenService tokenService)
    {
        var result = await _userService.UpdateUserById(id, userDto);
        if (result == null) return BadRequest();
        
        tokenService.CreateJwtToken(HttpContext, result);
        
        return Ok(result);
    }
    
    [Authorize]
    [HttpPut("{id:int}/update-user-front-side")]
    public async Task<ActionResult<User>> UpdateUserLoginOrDescription(int id, JObject jObject,
        [FromServices] ITokenService tokenService)
    {
        var bodyRequest = jObject.ToObject<Dictionary<string, string>>();
        if (bodyRequest == null) return BadRequest();
        
        var result =
            await _userService.UpdateUserLoginOrDescription(id, bodyRequest["login"], bodyRequest["description"]);
        if (result == null) return BadRequest();
        
        tokenService.CreateJwtToken(HttpContext, result);

        return Ok(result);

    }

    [Authorize]
    [HttpPut("{id:int}/update-password")]
    public async Task<ActionResult<User>> UpdateUserPassword(int id, JObject jObject, 
        [FromServices] ITokenService tokenService)
    {
        var bodyRequest = jObject.ToObject<Dictionary<string, string>>();
        if (bodyRequest == null) return BadRequest();

        var result = 
            await _userService.UpdateUserPassword(id, bodyRequest["oldPassword"], bodyRequest["newPassword"]);
        if (result == null) return BadRequest();
        
        tokenService.CreateJwtToken(HttpContext, result);

        return Ok(result);
    }
    
    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteUserById(int id)
    {
        var result = await _userService.DeleteUserById(id);
        if (result) return Ok();

        return BadRequest();
    }
}