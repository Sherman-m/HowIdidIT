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
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        return await _userService.GetAllUsers();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var result = await _userService.GetUserById(id);
        if (result == null) return NotFound();

        return Ok(result);
    }

    [Authorize]
    [HttpGet("info")]
    public async Task<ActionResult<User>> GetAuthUser()
    {
        var login = HttpContext.User.FindFirst(ClaimTypes.Name);
        if (login == null) return NotFound();
        
        var result = await _userService.GetUserByLogin(login.Value);
        if (result == null) return NotFound();
        
        return Ok(result);
    }
    
    [HttpPost("register")]
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
        var result = await _userService.AuthUser(userDto);
        if (result == null) return Unauthorized();
        
        tokenService.CreateJwtToken(HttpContext, result);
        return Ok(result);

    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<User>> UpdateUser(int id, [FromBody] UserDto userDto)
    {
        var result = await _userService.UpdateUser(id, userDto);
        if (result == null) return BadRequest();

        return Ok(result);
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        var result = await _userService.DeleteUser(id);
        if (result) return Ok();

        return BadRequest();
    }
}