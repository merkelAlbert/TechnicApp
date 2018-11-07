using System;
using System.Threading.Tasks;
using Technic.DAL.Models;

namespace Technic.Interfaces
{
    public interface IAccountService
    {
        Task Register(User user);
        Task<string> Login(User user);
    }
}