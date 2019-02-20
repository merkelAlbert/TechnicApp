using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO;
using Technic.DTO.Machines;
using Technic.DTO.MachineTypes;
using Technic.Interfaces;

namespace Technic.Services
{
    public class MachinesService : IMachinesService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        private readonly UserRepository _userRepository;
        private readonly IMachineTypesService _machineTypesService;
        private readonly ISpecificationsService _specificationsService;

        public MachinesService(DatabaseContext databaseContext, IMapper mapper, UserRepository userRepository,
            IMachineTypesService machineTypesService, ISpecificationsService specificationsService)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
            _userRepository = userRepository;
            _machineTypesService = machineTypesService;
            _specificationsService = specificationsService;
        }

        public async Task<List<MachinesModel>> GetMachines(bool isPrivateOffice)
        {
            var userId = _userRepository.GetCurrentUserId();
            var machines = await _databaseContext.Machines
                .Where(m => !isPrivateOffice || m.UserId == userId)
                .Include(m => m.Specifications)
                .ThenInclude(s => s.Specification)
                .ToListAsync();
            var machinesModels = new List<MachinesModel>();
            foreach (var machine in machines)
            {
                var machinesModel = _mapper.Map<Machine, MachinesModel>(machine);
                machinesModel.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                    ?.Name;
                machinesModels.Add(machinesModel);
            }

            return machinesModels;
        }

        public async Task<MachineModel> GetMachine(Guid machineId)
        {
            var machine = await _databaseContext.Machines
                .Include(m => m.Specifications)
                .ThenInclude(s => s.Specification)
                .FirstOrDefaultAsync(m => m.Id == machineId);
            if (machine != null)
            {
                var machineModel = _mapper.Map<Machine, MachineModel>(machine);
                machineModel.Type = await _machineTypesService.GetMachineType(machine.MachineTypeId);
                return machineModel;
            }

            throw new InvalidOperationException("Неверный id");
        }

        public async Task<MachinesModel> AddMachine(MachineInfo machineInfo)
        {
            var userId = _userRepository.GetCurrentUserId();
            var machine = _mapper.Map<MachineInfo, Machine>(machineInfo);
            machine.UserId = userId;
            _specificationsService.AddSpecificationsToMachine(machineInfo, ref machine);
            await _databaseContext.Machines.AddAsync(machine);
            await _databaseContext.SaveChangesAsync();
            var machinesModel = _mapper.Map<Machine, MachinesModel>(machine);
            machinesModel.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                ?.Name;

            return machinesModel;
        }

        public async Task<MachinesModel> UpdateMachine(Guid machineId, MachineInfo machineInfo)
        {
            var userId = _userRepository.GetCurrentUserId();
            var machine = _databaseContext.Machines.Include(m => m.Specifications)
                .FirstOrDefault(m => m.Id == machineId);
            if (machine != null)
            {
                _mapper.Map(machineInfo, machine);
                machine.UserId = userId;
                _specificationsService.AddSpecificationsToMachine(machineInfo, ref machine);
                await _databaseContext.SaveChangesAsync();
                var machinesModel = _mapper.Map<Machine, MachinesModel>(machine);
                machinesModel.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                    ?.Name;
                return machinesModel;
            }

            throw new InvalidOperationException("Неверный id");
        }
    }
}