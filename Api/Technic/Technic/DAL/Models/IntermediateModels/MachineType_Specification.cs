using System;

namespace Technic.DAL.Models.IntermediateModels
{
    public class MachineType_Specification
    {
        public Guid MachineTypeId { get; set; }
        public MachineType MachineType { get; set; }
        public Guid SpecificationId { get; set; }
        public Specification Specification { get; set; }
    }
}