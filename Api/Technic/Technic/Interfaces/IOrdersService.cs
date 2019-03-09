using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DTO.Orders;

namespace Technic.Interfaces
{
    public interface IOrdersService
    {
        Task<OrderModel> AddOrder(OrderInfo orderInfo);
        Task<List<OrderModel>> GetOrders(bool isPrivateOffice);
        Task<OrderModel> GetOrder(Guid machineId);
        Task<OrderModel> UpdateOrder(Guid machineId, OrderInfo machineInfo);
        Task<Guid> DeleteOrder(Guid machineId);
    }
}