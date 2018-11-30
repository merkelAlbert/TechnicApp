using Technic.DAL.Models.Enums;

namespace Technic.DTO
{
    public class RegistrationDto
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public AccountRole AccountRole { get; set; }
    }
}