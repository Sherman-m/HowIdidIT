using System.Security.Claims;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet("GetAllUsers")]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        return await _userService.GetAllUsers();
    }
    
    [HttpGet("GetUserById")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var result = await _userService.GetUserById(id);
        if (result == null) return NotFound();

        return Ok(result);
    }

    [Authorize]
    [HttpGet("GetAuthUser")]
    public async Task<ActionResult<User>> GetAuthUser()
    {
        var login = HttpContext.User.FindFirst(ClaimTypes.Name);
        if (login == null) return NotFound();
        
        var result = await _userService.GetUserByLogin(login.Value);
        if (result == null) return NotFound();
        
        return Ok(result);
    }
    
    [HttpPost("RegisterUser")]
    public async Task<ActionResult<User>> RegisterUser([FromBody] UserDto userDto)
    {
        var result = await _userService.AddUser(userDto);
        if (result == null) return BadRequest();
        
        return Ok(result);
    }
    
    [HttpPost("UserLogin")]
    public async Task<ActionResult<User>> UserLogin([FromBody] UserDto userDto, 
        [FromServices] ITokenService tokenService)
    {
        var result = await _userService.AuthUser(userDto);
        if (result == null) return Unauthorized();
        
        tokenService.CreateJwtToken(HttpContext, result);
        return Ok(result);

    }

    [Authorize]
    [HttpPut("UpdateUserById")]
    public async Task<ActionResult<User>> UpdateUserById(int id, [FromBody] UserDto userDto)
    {
        var result = await _userService.UpdateUserById(id, userDto);
        if (result == null) return BadRequest();

        return Ok(result);
    }
    
    [Authorize]
    [HttpDelete("DeleteUserById")]
    public async Task<ActionResult> DeleteUserById(int id)
    {
        var result = await _userService.DeleteUserById(id);
        if (result) return Ok();

        return BadRequest();
    }
}