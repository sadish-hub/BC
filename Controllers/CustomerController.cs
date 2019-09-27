using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context.Models;
using bright_choice.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bright_choice.Controllers {

    [Route ("api/[controller]")]
    public class CustomerController : Controller {

        private readonly IMapper mapper;
        private readonly ICustomerRepository customerRepository;

        public CustomerController (IMapper mapper, ICustomerRepository customerRepository) {
            this.mapper = mapper;
            this.customerRepository = customerRepository;
        }

        [HttpPost ("[action]")]
        [AllowAnonymous]
        public IActionResult AddUpdate ([FromBody] CustomerDTO customer) {
            var cust = mapper.Map<Customer> (customer);
            var insertedCustomer = IsUpdateCustomer () ? customerRepository.Update (cust) : customerRepository.Insert (cust);
            return Ok (insertedCustomer);

            bool IsUpdateCustomer () => customerRepository.IsCustomerVechicleAvailable (cust);
        }

        [HttpGet ("[action]")]
        public IActionResult Get (Guid Id) {
            var cust = customerRepository.GetCustomer (Id);
            var customer = mapper.Map<CustomerDTO> (cust);
            var vechicles = cust.CustomerVechicles.Select (i => i.Vechicle).Distinct ();
            customer.Vechicles = mapper.Map<List<VechicleDTO>> (vechicles);
            return Ok (customer);
        }

        [HttpGet ("[action]")]
        public IActionResult GetCustomers (int? size, int? page) {
            List<Customer> customers = customerRepository.GetCustomers (size, page).ToList ();
            var customersDTO = mapper.Map<List<CustomerDTO>> (customers);
            foreach (var item in customersDTO) {
                var vechicles = customers.Where (k => k.Id == item.Id).SelectMany (n => n.CustomerVechicles.Select (m => m.Vechicle).Distinct ());
                item.Vechicles = mapper.Map<List<VechicleDTO>> (vechicles);
            }
            return Ok (customersDTO);
        }

        [HttpGet ("[action]")]
        public IActionResult GetCustomersNames (string name) => Ok (customerRepository.GetCustomersNames (name));
    }
}