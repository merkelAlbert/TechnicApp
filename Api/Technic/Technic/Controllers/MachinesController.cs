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
        private readonly IMachinesService _machinesService;

        public MachinesController(IMachinesService machinesService)
        {
            _machinesService = machinesService;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> GetMachines()
        {
            try
            {
                return await _machinesService.GetMachines(this.GetUserId());
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("{machineId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> GetMachine([FromRoute] Guid machineId)
        {
            try
            {
                return await _machinesService.GetMachine(machineId);
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
                await _machinesService.AddMachine(this.GetUserId(), machineDto);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}