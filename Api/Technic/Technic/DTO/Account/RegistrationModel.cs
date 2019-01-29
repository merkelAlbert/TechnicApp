using Technic.DAL.Models.Enums;

namespace Technic.DTO.Account
{
    public class RegistrationModel
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public UserRole UserRole { get; set; }
    }
}