using AutoMapper;
using bright_choice.Context.Models;
using bright_choice.DTO;

namespace bright_choice.Profiles {
    public class MappingProfile : Profile {
        public MappingProfile () {
            CreateMap<Customer, CustomerDTO> ();
            CreateMap<CustomerDTO, Customer> ();

            CreateMap<CustomerVechicle, CustomerVechicleDTO> ();
            CreateMap<CustomerVechicleDTO, CustomerVechicle> ();

            CreateMap<Vechicle, VechicleDTO> ();
            CreateMap<VechicleDTO, Vechicle> ();

            CreateMap<Enquiry, EnquiryDTO> ();
            CreateMap<EnquiryDTO, Enquiry> ();
        }
    }
}