using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DTO.Orders;

namespace Technic.Interfaces
{
    public interface IOrdersService
    {
        Task<OrderModel> AddOrder(OrderInfo orderInfo);
        Task<List<OrdersModel>> GetOrders();
        Task<OrderModel> GetOrder(Guid orderId);
        Task<OrdersModel> UpdateOrder(Guid orderId, OrderInfo orderInfo);
        Task<Guid> DeleteOrder(Guid orderId);
    }
}