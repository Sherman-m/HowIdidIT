using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HowIdidIT.Data.Models;
using Microsoft.IdentityModel.Tokens;

namespace HowIdidIT.Data.Services.ServiceInterfaces;

public interface ITokenService
{
    void CreateJwtToken(HttpContext context, User user);
}