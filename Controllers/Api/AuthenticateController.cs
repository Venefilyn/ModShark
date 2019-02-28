using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModShark.Models;
using Reddit;

namespace ModShark.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly ModSharkContext _context;

        public AuthenticateController(ModSharkContext context)
        {
            _context = context;
        }

        // GET api/authenticate
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<Dictionary<string, string>>>> Get()
        {
            // Return token if it exists, otherwise sign out and return unauthorized
            try
            {
                Claim token = User.Claims.ToList().Find(n => n.Type == "token");
                // token exists, return it
                return Ok(new Dictionary<string, string> {{"token", token.Value}});
            }
            catch (ArgumentNullException e)
            {
                // Match is null, remove logged in
                await HttpContext.SignOutAsync();
            }

            return Unauthorized();
        }

        // POST api/authenticate
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] string token)
        {
            string username;
            try
            {
                RedditAPI reddit = new RedditAPI("id", token);
                username = reddit.Account.Me.Name;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Unauthorized(e.Message);
            }
            
            // No exceptions, token is valid and we have username
            // insert into database and store the primary key
            RedditUser user;
            try
            {
                string hashedUsername = RedditUser.HashUsername(username);
                user = _context.RedditUsers.Single(u => u.Username == hashedUsername);
            }
            catch (InvalidOperationException e)
            {
                user = new RedditUser()
                {
                    Username = username
                };
                _context.Add(user);
                _context.SaveChanges();
            }
            // retrieve username using Reddit.NET and variables from .env
            // if successful, store hashed token and hashed username in tables
            // call AuthenticateUser(username, token)
            await AuthenticateUser(user.Id, token);
            return Ok(new Dictionary<string, string>{{ "token", token }});
        }

        private async Task AuthenticateUser(int userId, string token)
        {
            var claims = new List<Claim>
            {
                new Claim("userId", userId.ToString()),
                new Claim("token", token),
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            AuthenticationProperties authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
        }
    }
}