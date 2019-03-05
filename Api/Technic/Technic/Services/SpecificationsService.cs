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
    }
}