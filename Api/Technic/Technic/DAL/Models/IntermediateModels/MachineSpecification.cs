using System;

namespace Technic.DAL.Models.IntermediateModels
{
    public class MachineSpecification
    {
        public Guid MachineId { get; set; }
        public Machine Machine { get; set; }
        public Guid SpecificationId { get; set; }
        public Specification Specification { get; set; }
        public string Value { get; set; }
    }
}