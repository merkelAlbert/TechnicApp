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
using Technic.DTO.MachineTypes;
using Technic.Interfaces;

namespace Technic.Services
{
    public class MachineTypeService : IMachineTypeService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public MachineTypeService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<List<MachineTypeDto>> GetMachineTypes()
        {
            var machineTypes = await _databaseContext.MachineTypes
                .Include(t => t.AllowedSpecifications)
                .ThenInclude(t => t.Specification)
                .ToListAsync();
            
            var machineTypesDtos = new List<MachineTypeDto>();
            foreach (var machineType in machineTypes)
            {
                var machineTypeDto = _mapper.Map<MachineType, MachineTypeDto>(machineType);
                machineTypesDtos.Add(machineTypeDto);
            }

            return machineTypesDtos;
        }
    }
}