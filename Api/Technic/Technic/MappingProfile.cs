using System;
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
            CreateMap<RegistrationModel, User>();
            CreateMap<LoginModel, User>();
            CreateMap<User, AuthorizedInfo>();

            CreateMap<MachineModel, Machine>()
                .ForMember(m => m.Specifications, o => o.Ignore());

            CreateMap<Machine, MachineModel>();
            CreateMap<Machine, MachineInfo>()
                .ForMember(m => m.Type, o => o.Ignore());

            CreateMap<Machine, MachinesInfo>()
                .ForMember(m => m.Type, o => o.Ignore())
                .ForMember(m => m.ImageId,
                    o => o.MapFrom(m =>
                        (m.ImagesIds != null && m.ImagesIds.Count > 0 && m.ImagesIds[0] != Guid.Empty)
                            ? m.ImagesIds[0]
                            : (Guid?) null));
            CreateMap<MachineInfo, MachinesInfo>()
                .ForMember(m => m.ImageId,
                    o => o.MapFrom(m =>
                        (m.ImagesIds != null && m.ImagesIds.Count > 0 && m.ImagesIds[0] != Guid.Empty)
                            ? m.ImagesIds[0]
                            : (Guid?) null));

            CreateMap<MachineSpecification, SpecificationModel>()
                .ForMember(s => s.Id, o => o.MapFrom(ms => ms.SpecificationId))
                .ForMember(s => s.Name, o => o.MapFrom(ms => ms.Specification.Name))
                .ForMember(s => s.Value, o => o.MapFrom(ms => ms.Value));

            CreateMap<MachineType, MachineTypeInfo>()
                .ForMember(t => t.AllowedSpecifications,
                    o => o.MapFrom(t => t.AllowedSpecifications.Select(s => s.Specification)));

            CreateMap<Specification, SpecificationsInfo>();
            CreateMap<SpecificationModel, Specification>();
        }
    }
}