using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Technic.DTO.Orders;
using Technic.Interfaces;

namespace Technic.Controllers
{
    [Route("[controller]")]
    public class OrdersController : Controller
    {
        private readonly IOrdersService _ordersService;

        public OrdersController(IOrdersService ordersService)
        {
            _ordersService = ordersService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Person")]
        public async Task<object> AddOrder([FromBody] OrderInfo orderInfo)
        {
            try
            {
                var order = await _ordersService.AddOrder(orderInfo);
                return order;
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}