using System;
using System.Collections.Generic;
using Technic.DAL.Models.Enums;
using Technic.DTO.MachineTypes;
using Technic.DTO.Specifications;

namespace Technic.DTO.Machines
{
    public class MachineModel
    {
        public Guid Id { get; set; }
        
        public List<Guid> ImagesIds { get; set; } = new List<Guid>();

        public string Name { get; set; }
        public MachineTypeModel Type { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public MachineStatus Status { get; set; }
        public List<SpecificationModel> Specifications { get; set; } = new List<SpecificationModel>();
    }
}