using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HowIdidIT.Controllers;

[Controller]
public class PageController : Controller
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
    
    [Route("/registration")]
    public IActionResult Registration()
    {
        if (User.Identity!.IsAuthenticated)
            return Redirect("/");
        return View("~/Views/Registration.cshtml");
    }
    
    [Route("/sections")]
    public IActionResult AllSections()
    {
        return View("~/Views/AllSections.cshtml");
    }
    
    [Route("/section")]
    public IActionResult Section()
    {
        return View("~/Views/Section.cshtml");
    }
    
    [Route("/discussion")]
    public IActionResult Discussion()
    {
        return View("~/Views/Discussion.cshtml");
    }
    
    [Authorize]
    [Route("/profile")]
    public IActionResult Profile()
    {
        return View("~/Views/Profile.cshtml");
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