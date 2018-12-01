using System;
using System.Collections.Generic;
using Technic.DAL.Models.IntermediateModels;

namespace Technic.DAL.Models
{
    public class Specification
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<MachineTypeSpecification> MachineTypes { get; set; }
        public ICollection<MachineSpecification> Machines { get; set; }
    }
}