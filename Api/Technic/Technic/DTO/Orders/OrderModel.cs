using System;
using Technic.DTO.Account;
using Technic.DTO.Machines;

namespace Technic.DTO.Orders
{
    public class OrderModel
    {
        public string Comment;
        public UserModel Company;

        public DateTime CreationDate;
        public DateTime FromDate;
        public Guid Id;
        public MachineModel Machine;
        public UserModel Person;
        public DateTime ToDate;
    }
}