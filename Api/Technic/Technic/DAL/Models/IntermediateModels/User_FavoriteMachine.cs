using System;

namespace Technic.DAL.Models.IntermediateModels
{
    public class User_FavoriteMachine
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid MachineId { get; set; }
        public Machine Machine { get; set; }
    }
}