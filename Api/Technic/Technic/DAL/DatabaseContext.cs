using System;
using Microsoft.EntityFrameworkCore;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;

namespace Technic.DAL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<MachineType> MachineTypes { get; set; }
        public DbSet<Specification> Specifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region MachineType-specification

            builder.Entity<MachineTypeSpecification>()
                .HasKey(mt => new {mt.MachineTypeId, mt.SpecificationId});

            builder.Entity<MachineTypeSpecification>()
                .HasOne(mt => mt.MachineType)
                .WithMany(mt => mt.AllowedSpecifications)
                .HasForeignKey(mt => mt.MachineTypeId);

            builder.Entity<MachineTypeSpecification>()
                .HasOne(mt => mt.Specification)
                .WithMany(mt => mt.MachineTypes)
                .HasForeignKey(mt => mt.SpecificationId);

            #endregion
            
            #region Machine-specification

            builder.Entity<MachineSpecification>()
                .HasKey(ms => new {ms.MachineId, ms.SpecificationId});

            builder.Entity<MachineSpecification>()
                .HasOne(ms => ms.Machine)
                .WithMany(ms => ms.Specifications)
                .HasForeignKey(ms => ms.MachineId);

            builder.Entity<MachineSpecification>()
                .HasOne(ms => ms.Specification)
                .WithMany(ms => ms.Machines)
                .HasForeignKey(ms => ms.SpecificationId);

            #endregion
        }
    }
}