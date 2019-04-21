using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.Enums;
using Technic.DTO.Account;
using Technic.DTO.Companies;
using Technic.Interfaces;

namespace Technic.Services
{
    public class CompaniesService : ICompaniesService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public CompaniesService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<List<CompaniesModel>> GetCompanies()
        {
            var companies = await _databaseContext.Users.Where(user => user.Role == UserRole.Company).ToListAsync();


            var companiesModels = new List<CompaniesModel>();
            foreach (var company in companies)
            {
                companiesModels.Add(_mapper.Map<User, CompaniesModel>(company));
            }

            return companiesModels;
        }

        public async Task<CompanyModel> GetCompany(Guid companyId)
        {
            var company = await _databaseContext.Users.Where(user => user.Role == UserRole.Company)
                .FirstOrDefaultAsync(u => u.Id == companyId);
            var companyModel = _mapper.Map<User, CompanyModel>(company);
            return companyModel ?? throw new InvalidOperationException("Неверный id");
        }
    }
}