using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Technic.DAL.Models;
using Technic.DTO;

namespace Technic.Interfaces
{
    public interface IMachineService
    {
        Task AddMachine(Guid userId, Machine machine, List<SpecificationDto> specifications);
    }
}