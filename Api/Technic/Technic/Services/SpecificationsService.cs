using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.EntityFrameworkCore;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO;
using Technic.DTO.Machines;
using Technic.DTO.MachineTypes;
using Technic.DTO.Specifications;
using Technic.Interfaces;

namespace Technic.Services
{
    public class SpecificationsService : ISpecificationsService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public SpecificationsService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public void AddSpecificationsToMachine(MachineInfo machineInfo,
            ref Machine machine)
        {
            var specifications = _databaseContext.Specifications.ToList();
            foreach (var specificationModel in machineInfo.Specifications)
            {
                //in db
                var specification = specifications.FirstOrDefault(s => s.Id == specificationModel.Id);
                if (specification != null)
                {
                    //in machine
                    var machineSpecification =
                        machine.Specifications.FirstOrDefault(s => s.Specification.Id == specificationModel.Id);
                    if (machineSpecification == null)
                    {
                        machine.Specifications.Add(new MachineSpecification()
                        {
                            Value = specificationModel.Value,
                            SpecificationId = specification.Id,
                        });
                    }
                    else
                    {
                        machineSpecification.Value = specificationModel.Value;
                    }
                }
            }
        }
    }
}