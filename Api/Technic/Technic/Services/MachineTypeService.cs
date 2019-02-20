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

        public async Task<MachineTypeModel> GetMachineType(Guid machineTypeId)
        {
            var machineType = await _databaseContext.MachineTypes.Include(mt => mt.AllowedSpecifications)
                .ThenInclude(s => s.Specification).FirstOrDefaultAsync(mt => mt.Id == machineTypeId);
            if (machineType != null)
            {
                var machineTypeModel = _mapper.Map<MachineType, MachineTypeModel>(machineType);
                return machineTypeModel;
            }
            throw new InvalidOperationException("Неверный id");
        }

        public async Task<List<MachineTypeModel>> GetMachineTypes()
        {
            var machineTypes = await _databaseContext.MachineTypes
                .Include(t => t.AllowedSpecifications)
                .ThenInclude(t => t.Specification)
                .ToListAsync();
            
            var machineTypeModels = new List<MachineTypeModel>();
            foreach (var machineType in machineTypes)
            {
                machineTypeModels.Add(_mapper.Map<MachineType, MachineTypeModel>(machineType));
            }

            return machineTypeModels;
        }
    }
}