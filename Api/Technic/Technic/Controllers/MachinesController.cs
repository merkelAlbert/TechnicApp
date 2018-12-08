using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Technic.DAL.Models;
using Technic.DTO;
using Technic.DTO.Machines;
using Technic.Extensions;
using Technic.Interfaces;

namespace Technic.Controllers
{
    [Route("[controller]")]
    public class MachinesController : Controller
    {
        private readonly IMachineService _machineService;

        public MachinesController(IMachineService machineService)
        {
            _machineService = machineService;
        }

        [HttpGet]
        [Route("{machineId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> GetMachine([FromRoute] Guid machineId)
        {
            try
            {
                return await _machineService.GetMachine(machineId);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddMachine([FromBody] MachineDto machineDto)
        {
            try
            {
                await _machineService.AddMachine(this.GetUserId(), machineDto);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}