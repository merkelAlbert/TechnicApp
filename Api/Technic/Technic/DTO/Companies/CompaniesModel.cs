using System;
using Technic.DAL.Models.Enums;

namespace Technic.DTO.Companies
{
    public class CompaniesModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int MachinesCount { get; set; }
    }
}