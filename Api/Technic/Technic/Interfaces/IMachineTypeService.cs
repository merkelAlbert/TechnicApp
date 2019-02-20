using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DAL.Models;
using Technic.DTO;
using Technic.DTO.MachineTypes;

namespace Technic.Interfaces
{
    public interface IMachineTypeService
    {
        Task<MachineTypeModel> GetMachineType(Guid machineTypeId);
        Task<List<MachineTypeModel>> GetMachineTypes();
    }
}