using System;
using System.Linq;
using AutoMapper;
using Technic.DAL.Models;
using Technic.DAL.Models.IntermediateModels;
using Technic.DTO.Account;
using Technic.DTO.Companies;
using Technic.DTO.Machines;
using Technic.DTO.MachineTypes;
using Technic.DTO.Orders;
using Technic.DTO.Specifications;

namespace Technic
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegistrationInfo, User>()
                .ForMember(u => u.RegistrationDate, options => options.MapFrom(_ => DateTime.Today));
            CreateMap<LoginInfo, User>();
            CreateMap<User, AuthorizedModel>();
            CreateMap<User, UserModel>();
            CreateMap<User, CompaniesModel>()
                .ForMember(c => c.MachinesCount, options => options.MapFrom(u => u.Machines.Count));
            CreateMap<User, UserModel>();
            CreateMap<UserInfo, User>();
            CreateMap<OrderInfo, Order>()
                .ForMember(o => o.ToDate, options => options.Condition(src => src.ToDate != DateTime.MinValue))
                .ForMember(o => o.FromDate, options => options.Condition(src => src.FromDate != DateTime.MinValue))
                .ForMember(o => o.CreationDate, options => options.MapFrom(_ => DateTime.Today))
                .ForMember(o => o.MachineId, options => options.Condition(src => src.MachineId != Guid.Empty));
            CreateMap<Order, OrderModel>();
            CreateMap<Order, OrdersModel>();
            CreateMap<Specification, SpecificationModel>();
            CreateMap<SpecificationInfo, Specification>();

            CreateMap<MachineInfo, Machine>()
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
                            : (Guid?) null))
                .ForMember(m => m.IsFavorite, o => o.Ignore());

            CreateMap<MachineSpecification, SpecificationInfo>()
                .ForMember(s => s.Id, o => o.MapFrom(ms => ms.SpecificationId))
                .ForMember(s => s.Name, o => o.MapFrom(ms => ms.Specification.Name))
                .ForMember(s => s.Value, o => o.MapFrom(ms => ms.Value))
                .ForMember(s => s.Measure, o => o.MapFrom(ms => ms.Specification.Measure));

            CreateMap<MachineSpecification, SpecificationModel>()
                .ForMember(s => s.Id, o => o.MapFrom(ms => ms.SpecificationId))
                .ForMember(s => s.Name, o => o.MapFrom(ms => ms.Specification.Name))
                .ForMember(s => s.Value, o => o.MapFrom(ms => ms.Value))
                .ForMember(s => s.Measure, o => o.MapFrom(ms => ms.Specification.Measure));

            CreateMap<MachineType, MachineTypeModel>()
                .ForMember(t => t.AllowedSpecifications,
                    o => o.MapFrom(t => t.AllowedSpecifications.Select(s => s.Specification)));
        }
    }
}