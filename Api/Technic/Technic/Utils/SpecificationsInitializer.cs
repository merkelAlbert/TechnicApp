using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.Enums;
using Technic.DAL.Models.IntermediateModels;
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
                spec.Measure = Measures.M;
                specs.Add(spec);

                //грузоподъемность
                spec = new Specification();
                spec.Name = MachineSpecifications.LiftHeight;
                spec.Measure = Measures.T;
                specs.Add(spec);

                //Тип топлива
                spec = new Specification();
                spec.Name = MachineSpecifications.FuelType;
                specs.Add(spec);

                //Тии погрузки
                spec = new Specification();
                spec.Name = MachineSpecifications.LoadingType;
                specs.Add(spec);


                _databaseContext.Specifications.AddRange(specs);
                await _databaseContext.SaveChangesAsync();
            }
        }
    }
}