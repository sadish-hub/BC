using bright_choice.BusinessLogic.Interfaces;
using bright_choice.BusinessLogic.Objects;
using Microsoft.Extensions.DependencyInjection;
namespace bright_choice {
    public static class ServiceCollectionExtension {
        public static void AddDIBinding (this IServiceCollection services) {
            services.AddScoped<ICustomerRepository, CustomerRepository> ();
            services.AddScoped<IVechicleRepository, VechicleRepository> ();
            services.AddScoped<IEnquiryRepository, EnquiryRepository>();
        }
    }
}