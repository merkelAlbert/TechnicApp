using System;
using System.Collections.Generic;
using Technic.DAL.Models.Enums;
using Technic.DAL.Models.IntermediateModels;

namespace Technic.DAL.Models
{
    public class MachineType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public ICollection<MachineTypeSpecification> AllowedSpecifications { get; set; } =
            new List<MachineTypeSpecification>();
    }
}