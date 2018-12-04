using System;
using System.Collections.Generic;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;

namespace Technic.DTO
{
    public class MachineDto
    {
        public Guid MachineTypeId { get; set; }
        
        public string Name { get; set; }
        public List<SpecificationDto> Specifications { get; set; } = new List<SpecificationDto>();
    }
}