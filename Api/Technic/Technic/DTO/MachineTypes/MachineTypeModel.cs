using System;
using System.Collections.Generic;
using Technic.DAL.Models;
using Technic.DTO.Specifications;

namespace Technic.DTO.MachineTypes
{
    public class MachineTypeModel
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        public List<SpecificationModel> AllowedSpecifications { get; set; } =
            new List<SpecificationModel>();
    }
}