using AutoMapper;
using Technic.DAL.Models;
using Technic.DTO;

namespace Technic
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegistrationDto, User>();
            CreateMap<LoginDto, User>();
            CreateMap<User, AuthorizedDto>();
        }
    }
}