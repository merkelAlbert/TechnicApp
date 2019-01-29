using System;
using System.Collections.Generic;
using Technic.DAL.Models;

namespace Technic.DTO.MachineTypes
{
    public class MachineTypeInfo
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        public List<SpecificationsInfo> AllowedSpecifications { get; set; } =
            new List<SpecificationsInfo>();
    }
}