using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Net.Http.Headers;
using System.Text.Json;
using WebStore.Data.Entities.Identity;
using WebStore.Interfaces;
using WebStore.Models.Account;

namespace WebStore.Services
{
    public class AccountService(
        UserManager<UserEntity> userManager,
        IMapper mapper,
        IConfiguration configuration
        ) : IAccountService
    {
        public async Task<string> LoginByGoogle(string token)
        {
            using var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            //configuration
            string userInfo = configuration["GoogleUserInfo"] ?? "https://www.googleapis.com/oauth2/v2/userinfo";
            var response = await httpClient.GetAsync(userInfo);

            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var googleUser = JsonSerializer.Deserialize<GoogleAccountModel>(json);

            var existingUser = await userManager.FindByEmailAsync(googleUser!.Email);
            if (existingUser != null)
            {
                var userLoginGoogle = await userManager.FindByLoginAsync("Google", googleUser.GogoleId);

                if (userLoginGoogle == null)
                {
                    await userManager.AddLoginAsync(existingUser, new UserLoginInfo("Google", googleUser.GogoleId, "Google"));
                }
                //var jwtToken = await tokenService.CreateTokenAsync(existingUser);
                return "";
            }
            else
            {
                var user = mapper.Map<UserEntity>(googleUser);

                if (!String.IsNullOrEmpty(googleUser.Picture))
                {
                    //user.Image = await imageService.SaveImageFromUrlAsync(googleUser.Picture);
                }

                var result = await userManager.CreateAsync(user); // Create user in the database
                if (result.Succeeded)
                {

                    result = await userManager.AddLoginAsync(user, new UserLoginInfo(
                        loginProvider: "Google",
                        providerKey: googleUser.GogoleId,
                        displayName: "Google"
                    ));

                    //await userManager.AddToRoleAsync(user, "User");
                    //var jwtToken = await tokenService.CreateTokenAsync(user);
                    return "";
                }
            }

            return string.Empty;
        }
    }
}