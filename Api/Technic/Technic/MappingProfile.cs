using AutoMapper;
using Technic.DAL.Models;
using Technic.DTO;

namespace Technic
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegistrationDto, Account>();
            CreateMap<LoginDto, Account>();
            CreateMap<Account, AuthorizedDto>();
        }
    }
}