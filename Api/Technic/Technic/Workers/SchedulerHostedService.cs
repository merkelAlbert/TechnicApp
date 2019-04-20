using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Technic.DAL;
using Technic.Interfaces;

namespace Technic.Workers
{
    public class SchedulerHostedService : IHostedService, IDisposable
    {
        private readonly IServiceProvider _services;
        private Timer _timer;

        public SchedulerHostedService(IServiceProvider services)
        {
            _services = services;
        }


        public Task StartAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("Start");
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromHours(2));
            return Task.CompletedTask;
        }

        private async void DoWork(object state)
        {
            Console.WriteLine("Task");
            using (var scope = _services.CreateScope())
            {
                var scopedProcessingService =
                    scope.ServiceProvider
                        .GetRequiredService<IScheduledTask>();
                var databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
                await scopedProcessingService.ExecuteAsync(databaseContext);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("Stop");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer.Dispose();
        }
    }
}