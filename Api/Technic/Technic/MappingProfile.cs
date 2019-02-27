using System;
using System.Linq;
using AutoMapper;
using Technic.DAL;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO;
using Technic.DTO.Account;
using Technic.DTO.Machines;
using Technic.DTO.MachineTypes;
using Technic.DTO.Specifications;

namespace Technic
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegistrationInfo, User>();
            CreateMap<LoginInfo, User>();
            CreateMap<User, AuthorizedModel>();
            CreateMap<User, UserModel>();
            CreateMap<UserInfo, User>();/*.ForMember(u => u.Id, o =>
                {
                    o.UseDestinationValue();
                    o.Ignore();
                })
                .ForMember(u => u.RegistrationDate, o =>
                {
                    o.UseDestinationValue();
                    o.Ignore();
                });*/

            CreateMap<MachineInfo, Machine>()
                .ForMember(m => m.Id, o =>
                {
                    o.UseDestinationValue();
                    o.Ignore();
                })
                .ForMember(m => m.Specifications, o => o.Ignore());

            CreateMap<Machine, MachineInfo>();
            CreateMap<Machine, MachineModel>()
                .ForMember(m => m.Type, o => o.Ignore());

            CreateMap<Machine, MachinesModel>()
                .ForMember(m => m.Type, o => o.Ignore())
                .ForMember(m => m.ImageId,
                    o => o.MapFrom(m =>
                        (m.ImagesIds != null && m.ImagesIds.Count > 0 && m.ImagesIds[0] != Guid.Empty)
                            ? m.ImagesIds[0]
                            : (Guid?) null));

            CreateMap<MachineSpecification, SpecificationInfo>()
                .ForMember(s => s.Id, o => o.MapFrom(ms => ms.SpecificationId))
                .ForMember(s => s.Name, o => o.MapFrom(ms => ms.Specification.Name))
                .ForMember(s => s.Value, o => o.MapFrom(ms => ms.Value));

            CreateMap<MachineType, MachineTypeModel>()
                .ForMember(t => t.AllowedSpecifications,
                    o => o.MapFrom(t => t.AllowedSpecifications.Select(s => s.Specification)));

            CreateMap<Specification, SpecificationModel>();
            CreateMap<SpecificationInfo, Specification>();
        }
    }
}