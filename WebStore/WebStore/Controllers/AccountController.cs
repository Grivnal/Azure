using Microsoft.AspNetCore.Mvc;
using WebStore.Interfaces;
using WebStore.Models.Account;

namespace WebStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(
        IAccountService accountService
        ) : ControllerBase
    {
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestModel model)
        {
            string result = await accountService.LoginByGoogle(model.Token);
            if (string.IsNullOrEmpty(result))
            {
                return BadRequest(new
                {
                    Status = 400,
                    IsValid = false,
                    Errors = new { Email = "Помилка реєстрації" }
                });
            }
            return Ok(new
            {
                Token = result
            });
        }
    }
}