using System.Security.Claims;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<ActionResult<UserDto>> GetUserById(int id)
    {
        var result = await _userService.GetUserById(id);
        if (result == null) return NotFound();
        
        return Ok(result);
    }

    [Authorize]
    [HttpGet("auth")]
    public async Task<ActionResult<User>> GetAuthUser()
    {
        var login = HttpContext.User.FindFirst(ClaimTypes.Name);
        if (login == null) return NotFound();
        
        var result = await _userService.GetUserByLogin(login.Value);
        if (result == null) return NotFound();
        
        return Ok(result);
    }
    
    [HttpPost("registration")]
    public async Task<ActionResult<UserDto>> RegisterUser([FromBody] UserDto userDto)
    {
        var result = await _userService.AddUser(userDto);
        if (result == null) return BadRequest();
        
        return Ok(result);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> UserLogin([FromBody] UserDto userDto, 
        [FromServices] ITokenService tokenService)
    {
        var result = await _userService.AuthUser(userDto);
        if (result == null) return Unauthorized();
        
        tokenService.CreateJwtToken(HttpContext, result);
        return Ok(result);

    }

    [Authorize]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<User>> UpdateUserById(int id, [FromBody] UserDto userDto)
    {
        var result = await _userService.UpdateUserById(id, userDto);
        if (result == null) return BadRequest();

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