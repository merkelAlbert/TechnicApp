using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO;
using Technic.Interfaces;

namespace Technic.Services
{
    public class MachinesService : IMachineService
    {
        private readonly DatabaseContext _databaseContext;

        public MachinesService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }


        private List<MachineSpecification> GetMachineSpecifications(List<SpecificationDto> specificationDtos)
        {
           var specifications = new List<MachineSpecification>();
            
            var specificationsIds = specificationDtos.Select(s => s.Id).ToList();
            
            var storedSpecifications = _databaseContext.Specifications
                .Where(s => specificationsIds.Contains(s.Id)).ToList();

            for (int i = 0; i < storedSpecifications.Count; i++)
            {
                var machineSpecification = new MachineSpecification();
                machineSpecification.Specification = storedSpecifications[i];
                machineSpecification.Value = specificationDtos[i].Value;
                specifications.Add(machineSpecification);
            }

            return specifications;
        }

        public async Task AddMachine(Guid userId, Machine machine, List<SpecificationDto> specificationDtos)
        {
            machine.UserId = userId;
            machine.Specifications = GetMachineSpecifications(specificationDtos);
            await _databaseContext.Machines.AddAsync(machine);
            await _databaseContext.SaveChangesAsync();
        }
    }
}