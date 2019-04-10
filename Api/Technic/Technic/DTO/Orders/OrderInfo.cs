using System;
using Technic.DAL.Models.Enums;

namespace Technic.DTO.Orders
{
    public class OrderInfo
    {
        public string Comment { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime FromDate { get; set; }
        public Guid MachineId { get; set; }
        public DateTime ToDate { get; set; }
        public OrderStatus Status { get; set; }
    }
}