using System;
using System.Collections.Generic;
using Technic.DAL.Models;

namespace Technic.DTO.MachineTypes
{
    public class MachineTypeDto
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        public List<SpecificationsDto> AllowedSpecifications { get; set; } =
            new List<SpecificationsDto>();
    }
}