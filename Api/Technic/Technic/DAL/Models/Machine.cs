using System;
using System.Collections.Generic;
using Technic.DAL.Models.IntermediateModels;

namespace Technic.DAL.Models
{
    public class Machine
    {
        public Guid Id { get; set; }
        public MachineType MachineType { get; set; }
        public ICollection<MachineSpecification> Specifications { get; set; } = new List<MachineSpecification>();
    }
}