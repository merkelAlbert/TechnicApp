using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Technic.Interfaces;

namespace Technic.Controllers
{
    [Route("api/[controller]")]
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