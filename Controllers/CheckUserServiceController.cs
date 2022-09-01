using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HowIdidIT.Data.DTOs;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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
    
    [HttpGet("{email}/{password}")]
    public async Task<ActionResult<User>> Login(string email, string password)
    {
        var result = await _userService.GetUserByEmail(email, password);
        if (result != null)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, result.Nickname),
                new Claim(ClaimTypes.Actor, result.TypeOfUser.Name)
            };
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(60)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            HttpContext.Response.Cookies.Append(".AspNetCore.Application.Id", encodedJwt, 
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromMinutes(60)
                });

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
}