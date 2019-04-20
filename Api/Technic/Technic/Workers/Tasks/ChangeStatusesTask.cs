using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models.Enums;
using Technic.Interfaces;

namespace Technic.Workers.Tasks
{
    public class ChangeStatusesTask : IScheduledTask
    {
        public async Task ExecuteAsync(DatabaseContext databaseContext)
        {
            var orders = databaseContext.Orders.Include(o => o.Machine);
            foreach (var order in orders)
            {
                if (order.Status == OrderStatus.Confirmed && order.FromDate >= DateTime.Today &&
                    order.ToDate >= DateTime.Today)
                {
                    if (order.Machine.Status != MachineStatus.Busy)
                        order.Machine.Status = MachineStatus.Busy;
                    if (order.Status != OrderStatus.Performing)
                        order.Status = OrderStatus.Performing;
                }
                else if (order.Status == OrderStatus.Performing && order.ToDate <= DateTime.Today)
                {
                    if (order.Machine.Status != MachineStatus.Active)
                        order.Machine.Status = MachineStatus.Active;
                    if (order.Status != OrderStatus.Performed)
                        order.Status = OrderStatus.Performed;
                }
            }

            await databaseContext.SaveChangesAsync();
        }
    }
}