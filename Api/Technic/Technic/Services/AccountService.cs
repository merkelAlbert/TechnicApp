using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.Enums;
using Technic.Interfaces;

namespace Technic.Services
{
    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IConfiguration _configuration;

        public AccountService(DatabaseContext databaseContext, IConfiguration configuration)
        {
            _databaseContext = databaseContext;
            _configuration = configuration;
        }
        
        private string CreateHash(string password, string salt)  
        {  
            var valueBytes = KeyDerivation.Pbkdf2(  
                password: password,  
                salt: Encoding.UTF8.GetBytes(salt),  
                prf: KeyDerivationPrf.HMACSHA512,  
                iterationCount: 10000,  
                numBytesRequested: 256 / 8);  
  
            return Convert.ToBase64String(valueBytes);  
        }  
        
        private string CreateSalt()  
        {  
            byte[] randomBytes = new byte[128 / 8];  
            using (var generator = RandomNumberGenerator.Create())  
            {  
                generator.GetBytes(randomBytes);  
                return Convert.ToBase64String(randomBytes);  
            }  
        }  
  
        private bool ValidatePassword(string password, string salt, string hash)  
            => CreateHash(password, salt) == hash; 

        private async Task<string> GenerateJwtToken(Account account)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, account.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, account.Id.ToString()),
                new Claim(ClaimTypes.Role, account.AccountRole.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return await Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
        }

        public async Task Register(Account account)
        {
            if (await _databaseContext.Accounts.FirstOrDefaultAsync(x => x.Email == account.Email) != null)
                throw new InvalidOperationException("Пользователь с данным email уже существует");
                
            var salt = CreateSalt();
            var hash = CreateHash(account.Password, salt);
            account.Password = hash;
            account.Salt = salt;
            await _databaseContext.Accounts.AddAsync(account);
            await _databaseContext.SaveChangesAsync();
        }

        public async Task<string> Login(Account account)
        {

            var storedAccount = await _databaseContext.Accounts
                .FirstOrDefaultAsync(x => x.Email == account.Email);
            
            if (storedAccount == null)
            {
                throw new InvalidOperationException("Неверный email или пароль");
            }

            if (!ValidatePassword(account.Password, storedAccount.Salt, storedAccount.Password))
            {
                throw new InvalidOperationException("Неверный email или пароль");
            }

            var token = await GenerateJwtToken(storedAccount);
            return token;
        }

        public async Task<Account> GetAccountById(Guid id)
        {
            var account = await _databaseContext.Accounts.FirstOrDefaultAsync(x => x.Id == id);
            return account ?? throw new InvalidOperationException("Неверный id");
        }
        
        public async Task<Account> GetAccountByEmail(string email)
        {
            var account = await _databaseContext.Accounts.FirstOrDefaultAsync(x => x.Email == email);
            return account ?? throw new InvalidOperationException("Неверный email");
        }
    }
}