using System.Linq;
using AutoMapper;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO;
using Technic.DTO.Account;
using Technic.DTO.Machines;
using Technic.DTO.MachineTypes;

namespace Technic
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegistrationDto, User>();
            CreateMap<LoginDto, User>();
            CreateMap<User, AuthorizedDto>();
            
            CreateMap<MachineDto, Machine>()
                .ForMember(m => m.Specifications, o => o.Ignore());
            
            CreateMap<Machine, MachineDto>();
            
            CreateMap<MachineSpecification, SpecificationDto>()
                .ForMember(s => s.Id, o => o.MapFrom(ms => ms.SpecificationId))
                .ForMember(s => s.Name, o => o.MapFrom(ms => ms.Specification.Name))
                .ForMember(s => s.Value, o => o.MapFrom(ms => ms.Value));
            
            CreateMap<MachineType, MachineTypeDto>()
                .ForMember(t => t.AllowedSpecifications,
                    o => o.MapFrom(t => t.AllowedSpecifications.Select(s => s.Specification)));
            
            CreateMap<Specification, SpecificationsDto>();
            CreateMap<SpecificationDto, Specification>();
        }
    }
}