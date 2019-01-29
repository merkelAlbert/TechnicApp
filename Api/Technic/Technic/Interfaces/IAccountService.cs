using System;
using System.Threading.Tasks;
using Technic.DAL.Models;
using Technic.DTO.Account;

namespace Technic.Interfaces
{
    public interface IAccountService
    {
        Task Register(RegistrationModel registrationModel);
        Task<string> Login(LoginModel loginModel);
        Task<AuthorizedInfo> GetUserById(Guid id);
        Task<AuthorizedInfo> GetUserByEmail(string email);
    }
}