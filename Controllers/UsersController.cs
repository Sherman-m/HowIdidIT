using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserService _context;

    public UserController(UserService context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.GetUsers();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.GetUser(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<User>> PutUser(int id, [FromBody] User user)
    {
        var result = await _context.UpdateUser(id, user);
        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUser([FromBody] UserDTO user)
    {
        var result = await _context.AddUser(user);
        if (result == null)
        {
            BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.DeleteUser(id);
        if (user)
        {
            return Ok();
        }

        return BadRequest();
    }
}