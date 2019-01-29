using System;
using System.Collections.Generic;
using Technic.DAL.Models.Enums;

namespace Technic.DTO.Machines
{
    public class MachineInfo
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public MachineStatus Status { get; set; }
        public List<SpecificationModel> Specifications { get; set; } = new List<SpecificationModel>();
    }
}