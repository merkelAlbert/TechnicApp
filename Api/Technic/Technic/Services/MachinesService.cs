using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO;
using Technic.DTO.Machines;
using Technic.Interfaces;

namespace Technic.Services
{
    public class MachinesService : IMachineService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public MachinesService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<MachineDto> GetMachine(Guid machineId)
        {
            var machine = await _databaseContext.Machines
                .Include(m => m.Specifications)
                .ThenInclude(s => s.Specification)
                .FirstOrDefaultAsync(m => m.Id == machineId);
            if (machine != null)
            {
                var machineDto = _mapper.Map<Machine, MachineDto>(machine);
                return machineDto;
            }

            throw new InvalidOperationException("Неверный id");
        }

        public async Task AddMachine(Guid userId, MachineDto machineDto)
        {
            var machine = _mapper.Map<MachineDto, Machine>(machineDto);
            machine.UserId = userId;
            var specifications = _databaseContext.Specifications.ToList();
            foreach (var specificationDto in machineDto.Specifications)
            {
                var specification = specifications.FirstOrDefault(s => s.Id == specificationDto.Id);
                if (specification != null)
                    machine.Specifications.Add(new MachineSpecification()
                    {
                        Value = specificationDto.Value,
                        SpecificationId = specification.Id,
                    });
            }

            await _databaseContext.Machines.AddAsync(machine);
            await _databaseContext.SaveChangesAsync();
        }
    }
}