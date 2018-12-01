using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Technic.DAL;
using Technic.Extensions;
using Technic.Utils;

namespace Technic
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args)
                .Build()
                .MigrateDatabase<DatabaseContext>()
                .Initialize<SpecificationsInitializer>(x => Task.WaitAll(x.InitializeAsync()))
                .Initialize<MachineTypesInitializer>(x => Task.WaitAll(x.InitializeAsync()))
                .Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls("http://*:5000");
    }
}