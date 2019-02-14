using System;
using System.Collections.Generic;
using Technic.DAL.Models;

namespace Technic.DTO.MachineTypes
{
    public class MachineTypeModel
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        public List<SpecificationsModel> AllowedSpecifications { get; set; } =
            new List<SpecificationsModel>();
    }
}