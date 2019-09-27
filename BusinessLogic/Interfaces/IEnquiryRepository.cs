using System;
using System.Collections.Generic;
using bright_choice.Context.Models;
namespace bright_choice.BusinessLogic.Interfaces {
    public interface IEnquiryRepository {
        Enquiry Insert (Enquiry enquiry);
        Enquiry Update (Enquiry enquiry);
        IEnumerable<Enquiry> GetEnquiries ();
        Enquiry GetEnquiry (Guid id);
        IEnumerable<Customer> GetLeads (string name);
    }
}