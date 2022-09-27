using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using NuGet.Protocol;

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
    
    [HttpPost("register")]
    public async Task<ActionResult<User>> RegisterUser([FromBody] UserDto userDto)
    {
        var result = await _userService.AddUser(userDto);
        if (result != null)
        {
            return Ok(result);
        }

        return BadRequest();
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
        if (result == null)
        {
            return NotFound();
        }
    
        return Ok(result);
    }

    [HttpGet("info")]
    [Authorize]
    public async Task<ActionResult<User>> GetAuthUser()
    {
        var login = HttpContext.User.FindFirst(ClaimTypes.Name);
        if (login != null)
        {
            var result = await _userService.GetUserByLogin(login.Value);
            return Ok(result);
        }

        return NotFound();
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<User>> UserLogin([FromBody] UserDto userDto)
    {
        var result = await _userService.AuthUser(userDto);
        if (result != null)
        {
            CreatingJwtToken(HttpContext, result);
            return Ok(result);
        }

        return Unauthorized();
    }
    
    [Authorize]
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

    private void CreatingJwtToken(HttpContext context, User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Login),
            new Claim(ClaimTypes.Actor, user.TypeOfUser.Name)
        };
        var jwt = new JwtSecurityToken(
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(60)),
            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                SecurityAlgorithms.HmacSha256));

        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        context.Response.Cookies.Append(".AspNetCore.Application.Id", encodedJwt,
            new CookieOptions
            {
                MaxAge = TimeSpan.FromMinutes(60)
            });
    }
}