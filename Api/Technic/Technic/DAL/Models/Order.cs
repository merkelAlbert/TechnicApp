using System;
using Technic.DAL.Models.Enums;

namespace Technic.DAL.Models
{
    public class Order
    {
        public Guid Id { get; set; }

        public Guid PersonId { get; set; }
        public User Person { get; set; }

        public Guid CompanyId { get; set; }
        public User Company { get; set; }

        public Guid MachineId { get; set; }
        public Machine Machine { get; set; }

        public DateTime CreationDate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Comment { get; set; }
        public OrderStatus Status { get; set; }
    }
}