using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Technic.DAL.Models;
using Technic.DTO;
using Technic.Extensions;
using Technic.Interfaces;

namespace Technic.Controllers
{
    [Route("[controller]")]
    public class MachineController : Controller
    {
        private readonly IMachineService _machineService;
        private readonly IMapper _mapper;

        public MachineController(IMachineService machineService, IMapper mapper)
        {
            _machineService = machineService;
            _mapper = mapper;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public IActionResult AddMachine([FromBody] MachineDto machineDto)
        {
            
            var machine = _mapper.Map<MachineDto, Machine>(machineDto);
            try
            {
                _machineService.AddMachine(this.GetUserId(), machine, machineDto.Specifications);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}