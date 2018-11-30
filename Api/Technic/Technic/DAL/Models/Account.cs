using System;
using Technic.DAL.Models.Enums;

namespace Technic.DAL.Models
{
    public class Account
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string Phone { get; set; }
        public AccountRole AccountRole { get; set; }
    }
}