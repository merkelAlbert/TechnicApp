using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DAL.Models;
using Technic.DTO;
using Technic.DTO.Machines;

namespace Technic.Interfaces
{
    public interface IMachinesService
    {
        Task<List<MachinesInfo>> GetMachines(Guid userId, bool isPrivateOffice);
        Task<MachineInfo> GetMachine(Guid machineId);
        Task<MachineInfo> AddMachine(Guid userId, MachineModel machineModel);
    }
}