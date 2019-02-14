using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
using Technic.DTO.Account;
using Technic.Interfaces;

namespace Technic.Services
{
    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AccountService(DatabaseContext databaseContext, IMapper mapper, IConfiguration configuration)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
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

        public async Task Register(RegistrationInfo registrationInfo)
        {
            var user = _mapper.Map<RegistrationInfo, User>(registrationInfo);
            if (await _databaseContext.Users.FirstOrDefaultAsync(x => x.Email == user.Email) != null)
                throw new InvalidOperationException("Пользователь с данным email уже существует");

            var salt = CreateSalt();
            var hash = CreateHash(user.Password, salt);
            user.Password = hash;
            user.Salt = salt;
            await _databaseContext.Users.AddAsync(user);
            await _databaseContext.SaveChangesAsync();
        }

        public async Task<string> Login(LoginInfo loginInfo)
        {
            var user = _mapper.Map<LoginInfo, User>(loginInfo);

            var storedUser = await _databaseContext.Users
                .FirstOrDefaultAsync(x => x.Email == user.Email);

            if (storedUser == null || !ValidatePassword(user.Password, storedUser.Salt, storedUser.Password))
            {
                throw new InvalidOperationException("Неверный email или пароль");
            }

            var token = await GenerateJwtToken(storedUser);
            return token;
        }

        public async Task<AuthorizedModel> GetUserById(Guid id)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            var authorizedModel = _mapper.Map<User, AuthorizedModel>(user);
            return authorizedModel ?? throw new InvalidOperationException("Неверный id");
        }

        public async Task<AuthorizedModel> GetUserByEmail(string email)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            var authorizedModel = _mapper.Map<User, AuthorizedModel>(user);
            return authorizedModel ?? throw new InvalidOperationException("Неверный email");
        }
    }
}