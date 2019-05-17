using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Technic.Interfaces;


namespace Technic.Controllers
{
    [Route("api/[controller]")]
    public class CompaniesController : Controller
    {
        private readonly ICompaniesService _companiesService;

        public CompaniesController(ICompaniesService machinesService)
        {
            _companiesService = machinesService;
        }

        [HttpGet]
        public async Task<object> GetCompanies()
        {
            try
            {
                return await _companiesService.GetCompanies();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("{companyId}")]
        public async Task<object> GetCompany([FromRoute] Guid companyId)
        {
            try
            {
                return await _companiesService.GetCompany(companyId);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}