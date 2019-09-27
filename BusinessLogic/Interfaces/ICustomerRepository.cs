using System;
using System.Collections.Generic;
using bright_choice.Context.Models;
namespace bright_choice.BusinessLogic.Interfaces {
    public interface ICustomerRepository {
        Customer Insert (Customer cust);
        Customer Update (Customer cust);
        IEnumerable<Customer> GetCustomers (int? size, int? page);
        Customer GetCustomer (Guid Id);
        IEnumerable<Customer> GetCustomersNames(string name);
        bool IsCustomerVechicleAvailable(Customer cust);
    }
}