using System;
using System.Collections.Generic;
using Technic.DAL.Models.Enums;
using Technic.DAL.Models.IntermediateModels;

namespace Technic.DAL.Models
{
    public class Machine
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid MachineTypeId { get; set; }
        public List<Guid> ImagesIds { get; set; } = new List<Guid>();

        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public MachineStatus Status { get; set; }

        public ICollection<MachineSpecification> Specifications { get; set; } = new List<MachineSpecification>();
        public ICollection<User_FavoriteMachine> Lovers { get; set; } = new List<User_FavoriteMachine>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}