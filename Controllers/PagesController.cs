using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Controller]
public class PagesController : Controller
{
    [Route("/")]
    public IActionResult Index()
    {
        return View("~/Views/Index.cshtml");
    }
    
    [Route("/login")]
    public IActionResult Login()
    {
        if (User.Identity!.IsAuthenticated)
            return Redirect("/");
        return View("~/Views/Login.cshtml");
    }
    
    [Authorize]
    [Route("/logout")]
    public IActionResult Logout([FromServices] ITokenService tokenService)
    {
        tokenService.DeleteJwtToken(HttpContext);
        return Redirect("/");
    }
    
    [Route("/registration")]
    public IActionResult Registration()
    {
        if (User.Identity!.IsAuthenticated)
            return Redirect("/");
        return View("~/Views/Registration.cshtml");
    }
    
    [Route("/topics")]
    public IActionResult AllSections()
    {
        return View("~/Views/AllTopics.cshtml");
    }
    
    [Route("/topics/{id:int}")]
    public IActionResult Section(int id)
    {
        return View("~/Views/Topic.cshtml");
    }
    
    [Route("/discussions/{id:int}")]
    public IActionResult Discussion(int id)
    {
        return View("~/Views/Discussion.cshtml");
    }
    
    [Authorize]
    [Route("/profile")]
    public IActionResult Profile()
    {
        if (User.Identity!.IsAuthenticated)
            return View("~/Views/Profile.cshtml");
        return Redirect("/login");
    }
    
    [Route("/change_password")]
    public IActionResult ChangePassword()
    {
        if (User.Identity!.IsAuthenticated)
            return Redirect("/");
        return View("~/Views/ChangePassword.cshtml");
    }
    
    [Route("/recover_password")]
    public IActionResult RecoverPassword()
    {
        if (User.Identity!.IsAuthenticated)
            return Redirect("/");
        return View("~/Views/RecoverPassword.cshtml");
    }
    
}