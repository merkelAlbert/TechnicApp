using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.InitialValues;

namespace Technic.Utils
{
    public class SpecificationsInitializer
    {
        private readonly DatabaseContext _databaseContext;

        public SpecificationsInitializer(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task InitializeAsync()
        {
            if (_databaseContext.Specifications.ToList().Count == 0)
            {
                var specs = new List<Specification>();
                var spec = new Specification();

                //высота подъема
                spec.Name = MachineSpecifications.LoadCapacity;
                spec.Measure = Measures.T;
                specs.Add(spec);

                //грузоподъемность
                spec = new Specification();
                spec.Name = MachineSpecifications.LiftHeight;
                spec.Measure = Measures.M;
                specs.Add(spec);

                //Тип топлива
                spec = new Specification();
                spec.Name = MachineSpecifications.FuelType;
                specs.Add(spec);

                //Тип погрузки
                spec = new Specification();
                spec.Name = MachineSpecifications.LoadingType;
                specs.Add(spec);
                
                //тяговое усилие лебедки
                spec = new Specification();
                spec.Name = MachineSpecifications.TractionWinch;
                spec.Measure = Measures.Kg;
                specs.Add(spec);
                
                //длина троса
                spec = new Specification();
                spec.Name = MachineSpecifications.CableLength;
                spec.Measure = Measures.M;
                specs.Add(spec);
                
                //максимальная скорость
                spec = new Specification();
                spec.Name = MachineSpecifications.MaxSpeed;
                spec.Measure = Measures.KmH;
                specs.Add(spec);
                
                //ширина ковша
                spec = new Specification();
                spec.Name = MachineSpecifications.BucketWidth;
                spec.Measure = Measures.M;
                specs.Add(spec);
                
                //расход топлива
                spec = new Specification();
                spec.Name = MachineSpecifications.FuelConsumption;
                spec.Measure = Measures.L;
                specs.Add(spec);
                
                //объем бака
                spec = new Specification();
                spec.Name = MachineSpecifications.TankVolume;
                spec.Measure = Measures.L;
                specs.Add(spec);

                _databaseContext.Specifications.AddRange(specs);
                await _databaseContext.SaveChangesAsync();
            }
        }
    }
}