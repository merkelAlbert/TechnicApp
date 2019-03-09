using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Technic.DAL.Models.Enums;

namespace Technic.DAL.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public UserRole Role { get; set; }

        public string Phone { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public DateTime RegistrationDate { get; set; } = new DateTime();

        public ICollection<Machine> Machines { get; set; } = new List<Machine>();

        [InverseProperty("Person")] public ICollection<Order> PersonOrders { get; set; } = new List<Order>();

        [InverseProperty("Company")] public ICollection<Order> CompanyOrders { get; set; } = new List<Order>();
    }
}