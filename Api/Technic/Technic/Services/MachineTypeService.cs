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

        public async Task<List<MachineTypeInfo>> GetMachineTypes()
        {
            var machineTypes = await _databaseContext.MachineTypes
                .Include(t => t.AllowedSpecifications)
                .ThenInclude(t => t.Specification)
                .ToListAsync();
            
            var machineTypeInfos = new List<MachineTypeInfo>();
            foreach (var machineType in machineTypes)
            {
                machineTypeInfos.Add(_mapper.Map<MachineType, MachineTypeInfo>(machineType));
            }

            return machineTypeInfos;
        }
    }
}