using System;
using System.Collections.Generic;
using Technic.DAL.Models;
using Technic.DAL.Models.Enums;
using Technic.DTO.Account;

namespace Technic.DTO.Machines
{
    public class MachinesModel
    {
        public Guid Id { get; set; }
        public Guid? ImageId { get; set; }

        public string Name { get; set; }
        public UserModel User { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public MachineStatus Status { get; set; }
        public bool IsFavorite { get; set; }
    }
}
