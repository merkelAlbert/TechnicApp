using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DAL.Models;
using Technic.DTO;
using Technic.DTO.Machines;

namespace Technic.Interfaces
{
    public interface IMachineService
    {
        Task<MachineDto> GetMachine(Guid machineId);
        Task AddMachine(Guid userId, MachineDto machineDto);
    }
}