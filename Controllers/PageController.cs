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
    
    [Route("/topics")]
    public IActionResult AllSections()
    {
        return View("~/Views/AllTopics.cshtml");
    }
    
    [Route("/topic")]
    public IActionResult Section()
    {
        return View("~/Views/Topic.cshtml");
    }
    
    [Route("/discussion")]
    public IActionResult Discussion()
    {
        return View("~/Views/Discussion.cshtml");
    }
    
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