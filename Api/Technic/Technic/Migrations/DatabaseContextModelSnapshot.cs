﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Technic.DAL;

namespace Technic.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.0-preview1-35029")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Technic.DAL.Models.IntermediateModels.MachineSpecification", b =>
                {
                    b.Property<Guid>("MachineId");

                    b.Property<Guid>("SpecificationId");

                    b.Property<string>("Value");

                    b.HasKey("MachineId", "SpecificationId");

                    b.HasIndex("SpecificationId");

                    b.ToTable("MachineSpecifications");
                });

            modelBuilder.Entity("Technic.DAL.Models.IntermediateModels.MachineType_Specification", b =>
                {
                    b.Property<Guid>("MachineTypeId");

                    b.Property<Guid>("SpecificationId");

                    b.HasKey("MachineTypeId", "SpecificationId");

                    b.HasIndex("SpecificationId");

                    b.ToTable("MachineType_Specifications");
                });

            modelBuilder.Entity("Technic.DAL.Models.Machine", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<List<Guid>>("ImagesIds");

                    b.Property<Guid>("MachineTypeId");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.Property<int>("Status");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Machines");
                });

            modelBuilder.Entity("Technic.DAL.Models.MachineType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("MachineTypes");
                });

            modelBuilder.Entity("Technic.DAL.Models.Specification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Specifications");
                });

            modelBuilder.Entity("Technic.DAL.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Password");

                    b.Property<string>("Phone");

                    b.Property<string>("Salt");

                    b.Property<int>("UserRole");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Technic.DAL.Models.IntermediateModels.MachineSpecification", b =>
                {
                    b.HasOne("Technic.DAL.Models.Machine", "Machine")
                        .WithMany("Specifications")
                        .HasForeignKey("MachineId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Technic.DAL.Models.Specification", "Specification")
                        .WithMany("Machines")
                        .HasForeignKey("SpecificationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Technic.DAL.Models.IntermediateModels.MachineType_Specification", b =>
                {
                    b.HasOne("Technic.DAL.Models.MachineType", "MachineType")
                        .WithMany("AllowedSpecifications")
                        .HasForeignKey("MachineTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Technic.DAL.Models.Specification", "Specification")
                        .WithMany("MachineTypes")
                        .HasForeignKey("SpecificationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Technic.DAL.Models.Machine", b =>
                {
                    b.HasOne("Technic.DAL.Models.User", "User")
                        .WithMany("Machines")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
