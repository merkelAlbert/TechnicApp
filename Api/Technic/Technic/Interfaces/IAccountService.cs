using System;
using System.Threading.Tasks;
using Technic.DTO.Account;

namespace Technic.Interfaces
{
    public interface IAccountService
    {
        Task Register(RegistrationInfo registrationInfo);
        Task<string> Login(LoginInfo loginInfo);
        Task<AuthorizedModel> GetUserByEmail(string email);
        Task<UserModel> GetUserById(Guid userId);
        Task<UserModel> UpdateUser(Guid userId, UserInfo userInfo);
    }
}