using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.Enums;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO.Machines;
using Technic.Interfaces;
using Technic.QueryFilters;

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

        public async Task<List<MachinesModel>> GetMachines(MachinesQueryFilter machinesQueryFilter)
        {
            var userId = _userRepository.GetCurrentUserId();
            var user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            var machines = _databaseContext.Machines
                .Include(m => m.Specifications)
                .ThenInclude(s => s.Specification)
                .Include(m => m.Lovers)
                .ThenInclude(l => l.User).ToList();

            machines = machines
                .Where(
                    m => machinesQueryFilter.MachineTypeId == null ||
                         m.MachineTypeId == machinesQueryFilter.MachineTypeId)
                .Where(
                    m => machinesQueryFilter.FromPrice == null || m.Price >= machinesQueryFilter.FromPrice)
                .Where(m =>
                    machinesQueryFilter.ToPrice == null || m.Price <= machinesQueryFilter.ToPrice)
                .Where(m => machinesQueryFilter.Specifications.Count == 0 || machinesQueryFilter.Specifications.All(s =>
                                m.Specifications.FirstOrDefault(ms => ms.SpecificationId == s.Key) !=
                                default(MachineSpecification) && m.Specifications
                                    .First(ms => ms.SpecificationId == s.Key).Value == s.Value))
                .ToList();

            if (machinesQueryFilter.IsPrivateOffice)
            {
                if (user.Role == UserRole.Company)
                {
                    machines = machines.Where(m => m.UserId == userId).ToList();
                }
                else if (user.Role == UserRole.Person)
                {
                    machines = machines.Where(m => m.Lovers.Select(l => l.UserId).Contains(userId)).ToList();
                }
            }

            var machinesModels = new List<MachinesModel>();
            foreach (var machine in machines)
            {
                var machinesModel = _mapper.Map<Machine, MachinesModel>(machine);
                machinesModel.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                    ?.Name;
                machinesModel.IsFavorite =
                    machine.Lovers.Select(l => l.User.Id).Contains(_userRepository.GetCurrentUserId());
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
            var userId = _userRepository.GetCurrentUserId();
            var user = await _databaseContext.Users.FirstAsync(u => u.Id == userId);
            var machine = _databaseContext.Machines.Include(m => m.Specifications).ThenInclude(s => s.Specification)
                .FirstOrDefault(m => m.Id == machineId);
            if (machine == null) throw new InvalidOperationException("Неверный id");
            if (user.Role == UserRole.Company)
            {
                DeleteUnusedImages(machineInfo, machine);
                _mapper.Map(machineInfo, machine);
                AddSpecificationsToMachine(machineInfo, ref machine);
            }
            else if (user.Role == UserRole.Person)
            {
                await SwitchIsFavorite(userId, machineInfo, machine);
            }

            await _databaseContext.SaveChangesAsync();
            var machinesModel = _mapper.Map<Machine, MachinesModel>(machine);

            machinesModel.Type = _databaseContext.MachineTypes.FirstOrDefault(t => t.Id == machine.MachineTypeId)
                ?.Name;
            machinesModel.IsFavorite = machine.Lovers.Select(l => l.UserId).Contains(userId);

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
            foreach (var specificationInfo in machineInfo.Specifications)
            {
                //in db
                var specification = specifications.FirstOrDefault(s => s.Id == specificationInfo.Id);
                if (specification == null) continue;

                //in machine
                var machineSpecification =
                    machineSpecifications.FirstOrDefault(s => s.Specification?.Id == specificationInfo.Id);
                if (machineSpecification == null)
                {
                    machineSpecifications.Add(new MachineSpecification()
                    {
                        Value = specificationInfo.Value,
                        SpecificationId = specification.Id,
                    });
                }
                else
                {
                    if (machineSpecification.Value == null)
                    {
                        machineSpecifications.Remove(machineSpecification);
                    }

                    machineSpecification.Value = specificationInfo.Value;
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

        private async Task SwitchIsFavorite(Guid userId, MachineInfo machineInfo, Machine machine)
        {
            if (!machineInfo.IsFavorite)
            {
                var userFavoriteMachine =
                    await _databaseContext.User_FavoriteMachines.FirstOrDefaultAsync(ufm =>
                        ufm.UserId == userId && ufm.MachineId == machine.Id);
                if (userFavoriteMachine != null)
                    _databaseContext.User_FavoriteMachines.Remove(userFavoriteMachine);
            }
            else
            {
                var userFavoriteMachine = new User_FavoriteMachine();
                userFavoriteMachine.UserId = userId;
                userFavoriteMachine.MachineId = machine.Id;
                machine.Lovers.Add(userFavoriteMachine);
            }
        }

        #endregion
    }
}