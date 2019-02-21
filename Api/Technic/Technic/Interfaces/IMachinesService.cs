using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Technic.DAL.Models;
using Technic.DTO;
using Technic.DTO.Machines;

namespace Technic.Interfaces
{
    public interface IMachinesService
    {
        Task<List<MachinesModel>> GetMachines(bool isPrivateOffice);
        Task<MachineModel> GetMachine(Guid machineId);
        Task<MachinesModel> AddMachine(MachineInfo machineInfo);
        Task<MachinesModel> UpdateMachine(Guid machineId, MachineInfo machineInfo);
        Task DeleteMachine(Guid machineId);
    }
}