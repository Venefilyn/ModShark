using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite.Internal.ApacheModRewrite;

namespace ModShark.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        // GET api/settings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            var claims = new List<Claim>
            {
                new Claim("email", "email"),
                new Claim("name", "name"),
                new Claim("role", "Administrator"),
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme, 
                new ClaimsPrincipal(claimsIdentity), 
                authProperties);
            var response = new List<string> {
                "value1", 
                "value2",
            };
            
            HttpContext.User.Claims.ToList().ForEach(n => response.Add($"{n.Type}, {n.Value}"));
            return response.ToArray();
        }

        // GET api/settings/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/settings
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/settings/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/settings/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}