using System;
using Technic.DAL.Models.Enums;

namespace Technic.DTO.Account
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}