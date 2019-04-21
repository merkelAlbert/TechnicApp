using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DTO.Machines;
using Technic.QueryFilters;

namespace Technic.Interfaces
{
    public interface IMachinesService
    {
        Task<MachinesModel> AddMachine(MachineInfo machineInfo);
        Task<List<MachinesModel>> GetMachines(MachinesQueryFilter machinesQueryFilter);
        Task<MachineModel> GetMachine(Guid machineId);
        Task<MachinesModel> UpdateMachine(Guid machineId, MachineInfo machineInfo);
        Task<Guid> DeleteMachine(Guid machineId);
    }
}