using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DTO.MachineTypes;

namespace Technic.Interfaces
{
    public interface IMachineTypesService
    {
        Task<MachineTypeModel> GetMachineType(Guid machineTypeId);
        Task<List<MachineTypeModel>> GetMachineTypes();
    }
}