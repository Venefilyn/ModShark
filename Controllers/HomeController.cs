using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ModShark.Models;

namespace ModShark.Controllers
{
    public class HomeController : Controller
    {
        private readonly ModSharkContext _context;

        public HomeController(ModSharkContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return File("~/index.html", "text/html");
        } 
        
        /*public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }*/
    }
}