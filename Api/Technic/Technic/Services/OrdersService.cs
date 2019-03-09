using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DTO.Orders;
using Technic.Interfaces;

namespace Technic.Services
{
    public class OrdersService : IOrdersService
    {
        private readonly IAccountService _accountService;
        private readonly DatabaseContext _databaseContext;
        private readonly IMachinesService _machinesService;
        private readonly IMapper _mapper;
        private readonly UserRepository _userRepository;

        public OrdersService(DatabaseContext databaseContext, IMapper mapper, UserRepository userRepository,
            IAccountService accountService, IMachinesService machinesService)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
            _userRepository = userRepository;
            _accountService = accountService;
            _machinesService = machinesService;
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

        public Task<List<OrderModel>> GetOrders(bool isPrivateOffice)
        {
            throw new NotImplementedException();
        }

        public Task<OrderModel> GetOrder(Guid machineId)
        {
            throw new NotImplementedException();
        }

        public Task<OrderModel> UpdateOrder(Guid machineId, OrderInfo machineInfo)
        {
            throw new NotImplementedException();
        }

        public Task<Guid> DeleteOrder(Guid machineId)
        {
            throw new NotImplementedException();
        }
    }
}