using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DTO.Account;
using Technic.DTO.Companies;

namespace Technic.Interfaces
{
    public interface ICompaniesService
    {
        Task<List<CompaniesModel>> GetCompanies();
        Task<CompanyModel> GetCompany(Guid companyId);
    }
}