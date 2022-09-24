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
        return View("~/Views/Login.cshtml");
    }
    
    [Route("/registration")]
    public IActionResult Registration()
    {
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
    
    [Route("/profile")]
    public IActionResult Profile()
    {
        return View("~/Views/Profile.cshtml");
    }
    
    [Route("/change_password")]
    public IActionResult ChangePassword()
    {
        return View("~/Views/ChangePassword.cshtml");
    }
    
    [Route("/send_email")]
    public IActionResult SendEmail()
    {
        return View("~/Views/SendEmail.cshtml");
    }
    
}