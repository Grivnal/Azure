using AutoMapper;
using WebStore.Data.Entities.Identity;
using WebStore.Models.Account;

namespace WebStore.Mapper;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<GoogleAccountModel, UserEntity>()
                .ForMember(x => x.Image, opt => opt.Ignore())
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
    }
}