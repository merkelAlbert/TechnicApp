using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Technic.DAL.Models.Enums;

namespace Technic.DTO.Machines
{
    public class MachineInfo
    {
        public Guid Id { get; set; }
        
        public Guid MachineTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public MachineStatus Status { get; set; }
        public List<SpecificationInfo> Specifications { get; set; } = new List<SpecificationInfo>();
        public List<Guid> ImagesIds { get; set; } = new List<Guid>();
    }
}