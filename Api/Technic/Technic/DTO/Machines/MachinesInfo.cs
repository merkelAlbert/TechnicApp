using System;
using System.Collections.Generic;
using Technic.DAL.Models.Enums;

namespace Technic.DTO.Machines
{
    public class MachinesInfo
    {
        public Guid Id { get; set; }
        public Guid? ImageId { get; set; }

        public string Name { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public MachineStatus Status { get; set; }
    }
}
