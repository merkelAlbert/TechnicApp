using System;
using System.Threading.Tasks;
using Technic.DAL.Models;
using Technic.DTO.Account;

namespace Technic.Interfaces
{
    public interface IAccountService
    {
        Task Register(RegistrationInfo registrationInfo);
        Task<string> Login(LoginInfo loginInfo);
        Task<UserModel> GetUserById(Guid id);
        Task<AuthorizedModel> GetUserByEmail(string email);
    }
}