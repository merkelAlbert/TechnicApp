using System;
using System.Threading.Tasks;
using Technic.DAL.Models;
using Technic.DTO.Account;

namespace Technic.Interfaces
{
    public interface IAccountService
    {
        Task Register(RegistrationDto registrationDto);
        Task<string> Login(LoginDto loginDto);
        Task<AuthorizedDto> GetUserById(Guid id);
        Task<AuthorizedDto> GetUserByEmail(string email);
    }
}