using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Technic.DAL.Models;
using Technic.DTO;
using Technic.Interfaces;

namespace Technic.Controllers
{
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationDto registrationDto)
        {
            var user = _mapper.Map<RegistrationDto, User>(registrationDto);
            try
            {
                await _accountService.Register(user);
                return Ok();
            }
            catch (InvalidOperationException e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<object> Login([FromBody] LoginDto loginDto)
        {
            var user = _mapper.Map<LoginDto, User>(loginDto);
            try
            {
                return new
                {
                    token = await _accountService.Login(user),
                    user = await _accountService.GetUserByEmail(user.Email)
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
        public async Task<object> GetUserInfo([FromRoute] Guid id)
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