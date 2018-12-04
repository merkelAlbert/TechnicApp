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

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.UserRole.ToString())
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

        public async Task Register(User user)
        {
            if (await _databaseContext.Users.FirstOrDefaultAsync(x => x.Email == user.Email) != null)
                throw new InvalidOperationException("Пользователь с данным email уже существует");
                
            var salt = CreateSalt();
            var hash = CreateHash(user.Password, salt);
            user.Password = hash;
            user.Salt = salt;
            await _databaseContext.Users.AddAsync(user);
            await _databaseContext.SaveChangesAsync();
        }

        public async Task<string> Login(User user)
        {

            var storedUser = await _databaseContext.Users
                .FirstOrDefaultAsync(x => x.Email == user.Email);
            
            if (storedUser == null)
            {
                throw new InvalidOperationException("Неверный email или пароль");
            }

            if (!ValidatePassword(user.Password, storedUser.Salt, storedUser.Password))
            {
                throw new InvalidOperationException("Неверный email или пароль");
            }

            var token = await GenerateJwtToken(storedUser);
            return token;
        }

        public async Task<User> GetUserById(Guid id)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            return user ?? throw new InvalidOperationException("Неверный id");
        }
        
        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            return user ?? throw new InvalidOperationException("Неверный email");
        }
    }
}