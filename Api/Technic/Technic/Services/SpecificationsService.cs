using AutoMapper;
using Technic.DAL;
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