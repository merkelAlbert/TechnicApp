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
    public class MachineTypesController : Controller
    {
        private readonly IMachineTypesService _machineTypesService;

        public MachineTypesController(IMachineTypesService machineTypesService)
        {
            _machineTypesService = machineTypesService;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<object> GetMachineTypes()
        {
            return await _machineTypesService.GetMachineTypes();
        }
    }
}