using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.InitialValues;

namespace Technic.Utils
{
    public class MachineTypesInitializer
    {
        private readonly DatabaseContext _databaseContext;

        public MachineTypesInitializer(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task InitializeAsync()
        {
            if (_databaseContext.MachineTypes.ToList().Count == 0)
            {
                var types = new List<MachineType>();
                var commonSpecs = _databaseContext.Specifications.Where(s =>
                        s.Name == MachineSpecifications.LiftHeight || s.Name == MachineSpecifications.LoadCapacity ||
                        s.Name == MachineSpecifications.FuelType)
                    .ToList();
                var type = new MachineType();

                var machineSpecs = new List<MachineType_Specification>();
                var specifications = new List<Specification>();

                //погрузчик вилочный
                type.Name = MachineTypes.ForkliftTruck;
                types.Add(type);

                //погрузчик фронтальный
                type = new MachineType();
                type.Name = MachineTypes.FrontTruck;
                machineSpecs = new List<MachineType_Specification>();
                specifications = _databaseContext.Specifications.Where(s =>
                        s.Name == MachineSpecifications.TankVolume ||
                        s.Name == MachineSpecifications.FuelConsumption || s.Name == MachineSpecifications.BucketWidth)
                    .ToList();
                foreach (var spec in specifications)
                {
                    machineSpecs.Add(new MachineType_Specification()
                    {
                        Specification = spec
                    });
                }

                foreach (var ms in machineSpecs)
                {
                    type.AllowedSpecifications.Add(ms);
                }

                types.Add(type);

                //погрузчик телескопический
                type = new MachineType();
                type.Name = MachineTypes.TelescopicTruck;
                machineSpecs = new List<MachineType_Specification>();
                specifications = _databaseContext.Specifications.Where(s =>
                        s.Name == MachineSpecifications.TankVolume ||
                        s.Name == MachineSpecifications.FuelConsumption || s.Name == MachineSpecifications.BucketWidth)
                    .ToList();
                foreach (var spec in specifications)
                {
                    machineSpecs.Add(new MachineType_Specification()
                    {
                        Specification = spec
                    });
                }

                foreach (var ms in machineSpecs)
                {
                    type.AllowedSpecifications.Add(ms);
                }

                types.Add(type);

                //экскаватор-погрузчик
                type = new MachineType();
                type.Name = MachineTypes.ExcavatorTruck;
                machineSpecs = new List<MachineType_Specification>();
                specifications = _databaseContext.Specifications.Where(s =>
                        s.Name == MachineSpecifications.TankVolume ||
                        s.Name == MachineSpecifications.FuelConsumption || s.Name == MachineSpecifications.BucketWidth)
                    .ToList();
                foreach (var spec in specifications)
                {
                    machineSpecs.Add(new MachineType_Specification()
                    {
                        Specification = spec
                    });
                }

                foreach (var ms in machineSpecs)
                {
                    type.AllowedSpecifications.Add(ms);
                }

                types.Add(type);

                //мини-погрузчик
                type = new MachineType();
                type.Name = MachineTypes.MiniTruck;
                machineSpecs = new List<MachineType_Specification>();
                specifications = _databaseContext.Specifications.Where(s =>
                        s.Name == MachineSpecifications.TankVolume ||
                        s.Name == MachineSpecifications.FuelConsumption || s.Name == MachineSpecifications.BucketWidth)
                    .ToList();
                foreach (var spec in specifications)
                {
                    machineSpecs.Add(new MachineType_Specification()
                    {
                        Specification = spec
                    });
                }

                foreach (var ms in machineSpecs)
                {
                    type.AllowedSpecifications.Add(ms);
                }

                types.Add(type);

                //подъемник коленчатый
                type = new MachineType();
                type.Name = MachineTypes.CrankedLift;
                types.Add(type);

                //подъемник ножничный
                type = new MachineType();
                type.Name = MachineTypes.ScissorLift;
                types.Add(type);

                //штабелер
                type = new MachineType();
                type.Name = MachineTypes.Stacker;
                types.Add(type);

                //ричтрак
                type = new MachineType();
                type.Name = MachineTypes.ReachTruck;
                types.Add(type);

                //эвакуатор
                type = new MachineType();
                type.Name = MachineTypes.TowTruck;
                machineSpecs = new List<MachineType_Specification>();
                specifications = _databaseContext.Specifications.Where(s =>
                        s.Name == MachineSpecifications.MaxSpeed || s.Name == MachineSpecifications.TankVolume ||
                        s.Name == MachineSpecifications.FuelConsumption ||
                        s.Name == MachineSpecifications.CableLength || s.Name == MachineSpecifications.TractionWinch)
                    .ToList();
                foreach (var spec in specifications)
                {
                    machineSpecs.Add(new MachineType_Specification()
                    {
                        Specification = spec
                    });
                }

                foreach (var ms in machineSpecs)
                {
                    type.AllowedSpecifications.Add(ms);
                }

                types.Add(type);

                //тип-характеристика
                foreach (var machineType in types)
                {
                    foreach (var spec in commonSpecs)
                    {
                        var typeSpec = new MachineType_Specification();
                        typeSpec.Specification = spec;
                        machineType.AllowedSpecifications.Add(typeSpec);
                    }
                }

                _databaseContext.MachineTypes.AddRange(types);
                await _databaseContext.SaveChangesAsync();
            }
        }
    }
}