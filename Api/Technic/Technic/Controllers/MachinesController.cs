using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Technic.DTO.Machines;
using Technic.Interfaces;
using Technic.QueryFilters;

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
        public async Task<object> GetMachines([FromQuery] MachinesQueryFilter machinesQueryFilter)
        {
            try
            {
                return await _machinesService.GetMachines(machinesQueryFilter);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("{machineId}")]
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
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Company")]
        public async Task<object> AddMachine([FromBody] MachineInfo machineInfo)
        {
            try
            {
                var machine = await _machinesService.AddMachine(machineInfo);
                return machine;
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("{machineId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> UpdateMachine([FromRoute] Guid machineId, [FromBody] MachineInfo machineInfo)
        {
            try
            {
                var machine = await _machinesService.UpdateMachine(machineId, machineInfo);
                return machine;
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{machineId}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Company")]
        public async Task<object> DeleteMachine([FromRoute] Guid machineId)
        {
            try
            {
                return await _machinesService.DeleteMachine(machineId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}