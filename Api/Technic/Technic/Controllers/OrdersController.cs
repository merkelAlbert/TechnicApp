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

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> GetOrders()
        {
            try
            {
                return await _ordersService.GetOrders();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("{orderId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> GetOrder([FromRoute] Guid orderId)
        {
            try
            {
                return await _ordersService.GetOrder(orderId);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
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

        [HttpPut]
        [Route("{orderId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> UpdateOrder([FromRoute] Guid orderId, [FromBody] OrderInfo orderInfo)
        {
            try
            {
                var order = await _ordersService.UpdateOrder(orderId, orderInfo);
                return order;
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{orderId}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Person")]
        public async Task<object> DeleteOrder([FromRoute] Guid orderId)
        {
            try
            {
                return await _ordersService.DeleteOrder(orderId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}