using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Technic.DAL.Models;
using Technic.DAL.Models.Enums;
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
            var account = _mapper.Map<RegistrationDto, Account>(registrationDto);
            try
            {
                await _accountService.Register(account);
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
            var account = _mapper.Map<LoginDto, Account>(loginDto);
            try
            {
                return new
                {
                    token = await _accountService.Login(account),
                    account = _mapper.Map<Account, AuthorizedDto>(await _accountService.GetAccountByEmail(account.Email))
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
                return _mapper.Map<Account, AuthorizedDto>(await _accountService.GetAccountById(id));
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }
    }
}