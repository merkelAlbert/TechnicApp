
using System.Threading.Tasks;
using Technic.DAL.Models;
using Technic.DTO.Machines;

namespace Technic.Interfaces
{
    public interface ISpecificationsService
    {
        void AddSpecificationsToMachine(MachineInfo machineInfo,
            ref Machine machine);
    }
}