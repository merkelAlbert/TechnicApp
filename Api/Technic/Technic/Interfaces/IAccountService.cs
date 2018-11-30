using System;
using System.Threading.Tasks;
using Technic.DAL.Models;

namespace Technic.Interfaces
{
    public interface IAccountService
    {
        Task Register(Account account);
        Task<string> Login(Account account);
        Task<Account> GetAccountById(Guid id);
        Task<Account> GetAccountByEmail(string email);
    }
}