using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HowIdidIT.Data.Models;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.IdentityModel.Tokens;

namespace HowIdidIT.Data.Services.ServiceImplementations;

public class TokenService : ITokenService
{
    public void CreateJwtToken(HttpContext context, User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
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

    public void DeleteJwtToken(HttpContext context)
    {
        context.Response.Cookies.Delete(".AspNetCore.Application.Id");
    }
}
