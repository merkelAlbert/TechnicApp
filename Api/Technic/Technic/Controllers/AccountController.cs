using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Technic.DAL.Models;
using Technic.DAL.Models.Enums;
using Technic.DTO;
using Technic.DTO.Account;
using Technic.Extensions;
using Technic.Interfaces;

namespace Technic.Controllers
{
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationInfo registrationInfo)
        {
            try
            {
                await _accountService.Register(registrationInfo);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<object> Login([FromBody] LoginInfo loginInfo)
        {
            try
            {
                return new
                {
                    token = await _accountService.Login(loginInfo),
                    account = await _accountService.GetUserByEmail(loginInfo.Email)
                };
            }
            catch (InvalidOperationException e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }
        
        

        [HttpGet]
        [Route("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> GetUser([FromRoute] Guid id)
        {
            try
            {
                return await _accountService.GetUserById(id);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }
    }
}