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
using Technic.Interfaces;

namespace Technic.Services
{
    public class MachinesService : IMachinesService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        private const string IMAGESFOLDER = "wwwroot/Images";

        public MachinesService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<List<MachinesInfo>> GetMachines(Guid userId, bool isPrivateOffice)
        {
            var machines = await _databaseContext.Machines
                .Where(m => !isPrivateOffice || m.UserId == userId)
                .Include(m => m.Specifications)
                .ThenInclude(s => s.Specification)
                .ToListAsync();
            var machineInfos = new List<MachinesInfo>();
            foreach (var machine in machines)
            {
                var machinesInfo = _mapper.Map<Machine, MachinesInfo>(machine);
                machinesInfo.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                    ?.Name;
                machineInfos.Add(machinesInfo);
            }

            return machineInfos;
        }

        public async Task<MachineInfo> GetMachine(Guid machineId)
        {
            var machine = await _databaseContext.Machines
                .Include(m => m.Specifications)
                .ThenInclude(s => s.Specification)
                .FirstOrDefaultAsync(m => m.Id == machineId);
            if (machine != null)
            {
                var machineInfo = _mapper.Map<Machine, MachineInfo>(machine);
                machineInfo.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                    ?.Name;
                return machineInfo;
            }

            throw new InvalidOperationException("Неверный id");
        }

        public async Task<MachinesInfo> AddMachine(Guid userId, MachineModel machineModel)
        {
            var machine = _mapper.Map<MachineModel, Machine>(machineModel);
            machine.UserId = userId;
            var specifications = _databaseContext.Specifications.ToList();
            foreach (var specificationModel in machineModel.Specifications)
            {
                var specification = specifications.FirstOrDefault(s => s.Id == specificationModel.Id);
                if (specification != null)
                    machine.Specifications.Add(new MachineSpecification()
                    {
                        Value = specificationModel.Value,
                        SpecificationId = specification.Id,
                    });
            }

            await _databaseContext.Machines.AddAsync(machine);
            await _databaseContext.SaveChangesAsync();
            var machinesInfo = _mapper.Map<MachineInfo, MachinesInfo>(await GetMachine(machine.Id));
            return machinesInfo;
        }
    }
}