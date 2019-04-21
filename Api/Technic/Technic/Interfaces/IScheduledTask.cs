using System.Threading.Tasks;
using Technic.DAL;

namespace Technic.Interfaces
{
    public interface IScheduledTask
    {
        Task ExecuteAsync(DatabaseContext databaseContext);
    }
}