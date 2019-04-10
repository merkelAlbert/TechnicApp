using System;
using Technic.DAL.Models.Enums;
using Technic.DTO.Account;
using Technic.DTO.Machines;

namespace Technic.DTO.Orders
{
    public class OrderModel
    {
        public Guid Id { get; set; }
        public UserModel Company { get; set; }
        public UserModel Person { get; set; }

        public MachineModel Machine { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Comment { get; set; }
        public OrderStatus Status { get; set; }
    }
}