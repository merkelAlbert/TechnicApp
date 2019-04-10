using System;
using Technic.DAL.Models.Enums;
using Technic.DTO.Account;
using Technic.DTO.Machines;

namespace Technic.DTO.Orders
{
    public class OrdersModel
    {
        public Guid Id { get; set; }
        public UserModel Company { get; set; }
        public UserModel Person { get; set; }

        public DateTime CreationDate { get; set; }
        public MachinesModel Machine { get; set; }
        public OrderStatus Status { get; set; }
    }
}