using System;

namespace Technic.DTO.Account
{
    public class AuthorizedModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Phone { get; set; }
    }
}