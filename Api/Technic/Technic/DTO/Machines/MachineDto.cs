using System;
using System.Collections.Generic;
using Technic.DAL.Models.Enums;

namespace Technic.DTO.Machines
{
    public class MachineDto
    {
        public Guid MachineTypeId { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public MachineStatus Status { get; set; }
        public List<SpecificationDto> Specifications { get; set; } = new List<SpecificationDto>();
    }
}