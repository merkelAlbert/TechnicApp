using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO.Machines;
using Technic.Interfaces;

namespace Technic.Services
{
    public class MachinesService : IMachinesService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IFilesService _filesService;
        private readonly IMachineTypesService _machineTypesService;
        private readonly IMapper _mapper;
        private readonly UserRepository _userRepository;


        public MachinesService(DatabaseContext databaseContext, IMapper mapper, UserRepository userRepository,
            IMachineTypesService machineTypesService,
            IFilesService filesService)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
            _userRepository = userRepository;
            _machineTypesService = machineTypesService;
            _filesService = filesService;
        }

        public async Task<MachinesModel> AddMachine(MachineInfo machineInfo)
        {
            var userId = _userRepository.GetCurrentUserId();
            var machine = _mapper.Map<MachineInfo, Machine>(machineInfo);
            machine.UserId = userId;
            AddSpecificationsToMachine(machineInfo, ref machine);
            await _databaseContext.Machines.AddAsync(machine);
            await _databaseContext.SaveChangesAsync();
            var machinesModel = _mapper.Map<Machine, MachinesModel>(machine);
            machinesModel.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                ?.Name;

            return machinesModel;
        }

        public async Task<List<MachinesModel>> GetMachines(bool isPrivateOffice)
        {
            var machines = await _databaseContext.Machines
                .Where(m => !isPrivateOffice || m.UserId == _userRepository.GetCurrentUserId())
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
            if (machine == null) throw new InvalidOperationException("Неверный id");
            var machineModel = _mapper.Map<Machine, MachineModel>(machine);
            machineModel.Type = await _machineTypesService.GetMachineType(machine.MachineTypeId);
            return machineModel;
        }

        public async Task<MachinesModel> UpdateMachine(Guid machineId, MachineInfo machineInfo)
        {
            var machine = _databaseContext.Machines.Include(m => m.Specifications).ThenInclude(s => s.Specification)
                .FirstOrDefault(m => m.Id == machineId);
            if (machine == null) throw new InvalidOperationException("Неверный id");
            DeleteUnusedImages(machineInfo, machine);
            _mapper.Map(machineInfo, machine);
            AddSpecificationsToMachine(machineInfo, ref machine);
            await _databaseContext.SaveChangesAsync();
            var machinesModel = _mapper.Map<Machine, MachinesModel>(machine);
            machinesModel.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                ?.Name;
            return machinesModel;
        }

        public async Task<Guid> DeleteMachine(Guid machineId)
        {
            var machine = await _databaseContext.Machines.FirstOrDefaultAsync(m => m.Id == machineId);
            if (machine == null) throw new InvalidOperationException("Неверный id");
            var guid = machine.Id;
            foreach (var image in machine.ImagesIds)
            {
                _filesService.DeleteFile(image);
            }

            _databaseContext.Remove(machine);
            _databaseContext.SaveChanges();
            return guid;
        }

        #region machinesUtils

        private void AddSpecificationsToMachine(MachineInfo machineInfo,
            ref Machine machine)
        {
            var specifications = _databaseContext.Specifications.ToList();
            var machineSpecifications = machine.Specifications;
            foreach (var specificationModel in machineInfo.Specifications)
            {
                //in db
                var specification = specifications.FirstOrDefault(s => s.Id == specificationModel.Id);
                if (specification == null) continue;
                {
                    //in machine
                    var machineSpecification =
                        machineSpecifications.FirstOrDefault(s => s.Specification?.Id == specificationModel.Id);
                    if (machineSpecification == null)
                    {
                        machineSpecifications.Add(new MachineSpecification()
                        {
                            Value = specificationModel.Value,
                            SpecificationId = specification.Id,
                        });
                    }
                    else
                    {
                        machineSpecification.Value = specificationModel.Value;
                    }
                }
            }
        }

        private void DeleteUnusedImages(MachineInfo machineInfo, Machine machine)
        {
            if (machineInfo.ImagesIds == null)
            {
                foreach (var machineId in machine.ImagesIds)
                {
                    _filesService.DeleteFile(machineId);
                }
            }
            else
            {
                foreach (var machineId in machine.ImagesIds)
                {
                    if (!machineInfo.ImagesIds.Contains(machineId))
                    {
                        _filesService.DeleteFile(machineId);
                    }
                }
            }
        }

        #endregion
    }
}