using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.Enums;
using Technic.DTO.Orders;
using Technic.Interfaces;

namespace Technic.Services
{
    public class OrdersService : IOrdersService
    {
        private readonly IAccountService _accountService;
        private readonly IMachineTypesService _machineTypesService;
        private readonly DatabaseContext _databaseContext;
        private readonly IMachinesService _machinesService;
        private readonly IMapper _mapper;
        private readonly UserRepository _userRepository;

        public OrdersService(IAccountService accountService, IMachineTypesService machineTypesService,
            DatabaseContext databaseContext, IMachinesService machinesService, IMapper mapper,
            UserRepository userRepository)
        {
            _accountService = accountService;
            _machineTypesService = machineTypesService;
            _databaseContext = databaseContext;
            _machinesService = machinesService;
            _mapper = mapper;
            _userRepository = userRepository;
        }


        public async Task<OrderModel> AddOrder(OrderInfo orderInfo)
        {
            var personId = _userRepository.GetCurrentUserId();
            var companyId = (await _databaseContext.Machines.FirstOrDefaultAsync(m => m.Id == orderInfo.MachineId))
                .UserId;
            var order = _mapper.Map<OrderInfo, Order>(orderInfo);
            order.PersonId = personId;
            order.CompanyId = companyId;
            await _databaseContext.Orders.AddAsync(order);
            await _databaseContext.SaveChangesAsync();
            var addedOrder = await _databaseContext.Orders
                .Include(o => o.Person)
                .Include(o => o.Company)
                .FirstOrDefaultAsync(o => o.Id == order.Id);
            var orderModel = _mapper.Map<Order, OrderModel>(addedOrder);
            return orderModel;
        }

        public async Task<List<OrdersModel>> GetOrders()
        {
            var userId = _userRepository.GetCurrentUserId();
            var orders = await _databaseContext.Orders
                .Where(o => o.Person.Id == userId || o.Company.Id == userId)
                .Include(o => o.Person)
                .Include(o => o.Company)
                .Include(o => o.Machine)
                .ToListAsync();
            var ordersModels = new List<OrdersModel>();
            foreach (var order in orders)
            {
                var ordersModel = _mapper.Map<Order, OrdersModel>(order);
                ordersModels.Add(ordersModel);
            }

            return ordersModels;
        }

        public async Task<OrderModel> GetOrder(Guid orderId)
        {
            var order = await _databaseContext.Orders
                .Include(o => o.Person)
                .Include(o => o.Company)
                .Include(o => o.Machine)
                .ThenInclude(m => m.Specifications).ThenInclude(s => s.Specification)
                .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) throw new InvalidOperationException("Неверный id");
            var orderModel = _mapper.Map<Order, OrderModel>(order);
            orderModel.Machine.Type = await _machineTypesService.GetMachineType(order.Machine.MachineTypeId);

            return orderModel;
        }

        public async Task<OrdersModel> UpdateOrder(Guid orderId, OrderInfo orderInfo)
        {
            var order = _databaseContext.Orders
                .Include(o => o.Person)
                .Include(o => o.Company)
                .Include(o => o.Machine)
                .FirstOrDefault(m => m.Id == orderId);
            if (order == null) throw new InvalidOperationException("Неверный id");
            _mapper.Map(orderInfo, order);
            await _databaseContext.SaveChangesAsync();
            var ordersModel = _mapper.Map<Order, OrdersModel>(order);
            return ordersModel;
        }

        public async Task<Guid> DeleteOrder(Guid orderId)
        {
            var order = await _databaseContext.Orders
                .Include(o => o.Machine)
                .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null) throw new InvalidOperationException("Неверный id");
            var guid = order.Id;
            order.Machine.Status = MachineStatus.Active;
            _databaseContext.Remove(order);
            _databaseContext.SaveChanges();

            return guid;
        }
    }
}