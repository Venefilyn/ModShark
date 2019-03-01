using Microsoft.AspNetCore.Mvc;

namespace ModShark.Controllers.Api
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View("Login");
        } 
    }
}