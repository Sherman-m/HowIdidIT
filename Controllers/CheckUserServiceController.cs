using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("[controller]")]
[ApiController]
public class CheckUserServiceController : ControllerBase
{
    private readonly IUserService _userService;

    public CheckUserServiceController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpPost]
    public async Task<ActionResult<User>> RegisterUser([FromBody] UserDto userDto)
    {
        var result = await _userService.AddUser(userDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        return await _userService.GetUsers();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var result = await _userService.GetUser(id);
        if (result == null)
        {
            return NotFound();
        }

        return result;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<User>> UpdateUser(int id, [FromBody] UserDto userDto)
    {
        var result = await _userService.UpdateUser(id, userDto);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }
        
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        var result = await _userService.DeleteUser(id);
        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }
}