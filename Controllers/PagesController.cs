using System.Security.Claims;
using HowIdidIT.Data.Services.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Controller]
public class PagesController : Controller
{
    [Route("/")]
    public IActionResult IndexPage()
    {
        return View("~/Views/Index.cshtml");
    }
    
    [Route("/login")]
    public IActionResult LoginPage()
    {
        if (User.Identity!.IsAuthenticated)
            return Redirect("/");
        return View("~/Views/Login.cshtml");
    }
    
    [Authorize]
    [Route("/logout")]
    public IActionResult LogoutPage([FromServices] ITokenService tokenService)
    {
        tokenService.DeleteJwtToken(HttpContext);
        return Redirect("/");
    }
    
    [Route("/registration")]
    public IActionResult RegistrationPage()
    {
        if (User.Identity!.IsAuthenticated)
            return Redirect("/");
        return View("~/Views/Registration.cshtml");
    }
    
    [Route("/topics")]
    public IActionResult AllSectionsPage()
    {
        return View("~/Views/AllTopics.cshtml");
    }
    
    [Route("/topics/{id:int}")]
    public IActionResult SectionPage(int id)
    {
        return View("~/Views/Topic.cshtml");
    }
    
    [Route("/discussions/{id:int}")]
    public IActionResult DiscussionPage(int id)
    {
        return View("~/Views/Discussion.cshtml");
    }
    
    [Authorize]
    [Route("/profile")]
    public IActionResult ProfilePage()
    {
        if (User.Identity!.IsAuthenticated)
            return View("~/Views/Profile.cshtml");
        return Redirect("/login");
    }

    [Route("/users/{id:int}")]
    public IActionResult UserPage(int id)
    {
        return View("~/Views/User.cshtml");
    }
    
    [Authorize]
    [Route("/users/{id:int}/change-password")]
    public IActionResult ChangePasswordPage(int id)
    {
        return View("~/Views/ChangePassword.cshtml");
    }
    
    [Route("/recover_password")]
    public IActionResult RecoverPasswordPage()
    {
        if (User.Identity!.IsAuthenticated)
            return Redirect("/");
        return View("~/Views/RecoverPassword.cshtml");
    }
    
}