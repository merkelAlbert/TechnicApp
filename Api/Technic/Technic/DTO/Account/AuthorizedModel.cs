using System;
using Technic.DAL.Models.Enums;

namespace Technic.DTO.Account
{
    public class AuthorizedModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public UserRole Role { get; set; }
    }
}