using System;

namespace Technic.DTO.Orders
{
    public class OrderInfo
    {
        public string Comment;
        public DateTime CreationDate;
        public DateTime FromDate;
        public Guid MachineId;
        public DateTime ToDate;
    }
}