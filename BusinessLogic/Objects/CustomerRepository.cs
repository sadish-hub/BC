using System;
using System.Collections.Generic;
using System.Linq;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context;
using bright_choice.Context.Models;
using Microsoft.EntityFrameworkCore;

namespace bright_choice.BusinessLogic.Objects {
    public class CustomerRepository : ICustomerRepository {
        private readonly BrightChoiceContext context;
        public CustomerRepository (BrightChoiceContext brightChoice) {
            context = brightChoice;
        }

        public Customer GetCustomer (Guid Id) => context.Customers.Where (l => l.Id == Id).Include(j => j.CustomerVechicles).ThenInclude (k => k.Vechicle).FirstOrDefault();

        public IEnumerable<Customer> GetCustomers (int? size, int? page) {
            IQueryable<Customer> customers = null;
            if (size != null && page != null) {
                customers = context.Customers.Where (b =>
                    b.CustomerVechicles.Any (m => m.Type == CustomerTypeEnum.buyer || m.Type == CustomerTypeEnum.seller)).Skip ((int) page * (int) size).Take ((int) size);
            } else if (page != null) {
                customers = context.Customers.Where (b =>
                    b.CustomerVechicles.Any (m => m.Type == CustomerTypeEnum.buyer || m.Type == CustomerTypeEnum.seller)).Skip ((int) page * 5).Take (5);
            } else if (size != null) {
                customers = context.Customers.Where (b =>
                    b.CustomerVechicles.Any (m => m.Type == CustomerTypeEnum.buyer || m.Type == CustomerTypeEnum.seller)).Take ((int) size);
            } else {
                customers = context.Customers.Where (b =>
                    b.CustomerVechicles.Any (m => m.Type == CustomerTypeEnum.buyer || m.Type == CustomerTypeEnum.seller));
            }
            return customers.Include (h => h.CustomerVechicles).ThenInclude (k => k.Vechicle).ToList ();
        }

        public IEnumerable<Customer> GetCustomersNames (string name) => String.IsNullOrEmpty (name) ?
            context.Customers.Where (b => (b.CustomerVechicles.Any (m => m.Type == CustomerTypeEnum.buyer || m.Type == CustomerTypeEnum.seller))).ToList () :
            context.Customers.Where (b => (b.CustomerVechicles.Any (m => m.Type == CustomerTypeEnum.buyer || m.Type == CustomerTypeEnum.seller)) && b.Name.Contains (name)).ToList ();

        public Customer Insert (Customer cust) {
            context.Database.EnsureCreated ();

            if (cust.Id == Guid.Empty) {
                cust.ACFormat = GetACFormat ();
                cust.ACNo = GetACNo ();
                context.Customers.Add (cust);
            }
            context.CustomerVechicles.AddRange (cust.CustomerVechicles);
            context.SaveChanges ();

            int GetACNo () {
                var AcNoForThisMonth = context.Customers.Where (j => j.ACFormat == cust.ACFormat);
                return AcNoForThisMonth.Count () > 0 ? AcNoForThisMonth.Select (h => h.ACNo).Max () + 1 : 1;
            }
            return cust;

            string GetACFormat () => "BC41" + (checkBuyerOrSeller () ? "B" : "S") + DateTime.Now.Year + DateTime.Now.ToString ("MM");

            bool checkBuyerOrSeller () => cust.CustomerVechicles.Any (m => m.Type == CustomerTypeEnum.buyer);
        }

        public Customer Update (Customer cust) {
            var customer = context.Customers.Find (cust.Id);

            customer.Address = cust.Address;
            customer.AnyOtherCar = cust.AnyOtherCar;
            customer.DOB = cust.DOB;
            customer.EmailId = cust.EmailId;
            customer.InsuranceDetails = cust.InsuranceDetails;
            customer.LandlineNumber = cust.LandlineNumber;
            customer.MobileNumber = cust.MobileNumber;
            customer.Name = cust.Name;
            customer.Native = cust.Native;
            customer.NextCarDetails = cust.NextCarDetails;
            customer.OfficeAddress = cust.OfficeAddress;
            customer.OfficeEmail = cust.OfficeEmail;
            customer.OfficeLandline = cust.OfficeLandline;
            customer.OfficeName = cust.OfficeName ;
            customer.Religion = cust.Religion;
            customer.ServiceDetails = cust.ServiceDetails;
            customer.ThankYou = cust.ThankYou;
            customer.UpdatedDate = DateTime.UtcNow;
            customer.WeddingAnniversary = cust.WeddingAnniversary;

            foreach (var cusVech in cust.CustomerVechicles) {
                var vech = context.CustomerVechicles.Find (cusVech.Id);
                vech.Bank = cusVech.Bank;
                vech.BankAccNo = cusVech.BankAccNo;
                vech.Budget = cusVech.Budget;
                vech.EMI = cusVech.EMI;
                vech.EMIDate = cusVech.EMIDate;
                vech.Insurance = cusVech.Insurance;
                vech.LoanAmount = cusVech.LoanAmount;
                vech.RC = cusVech.RC;
                vech.SellerContactNumber = cusVech.SellerContactNumber;
                vech.SellerName = cusVech.SellerName;
                vech.Status = cusVech.Status;
                vech.Tenor = cusVech.Tenor;
                vech.UpdatedDate = DateTime.UtcNow;
                vech.VechicleNumber = cusVech.VechicleNumber;
            }

            context.SaveChanges ();
            return cust;
        }

        public bool IsCustomerVechicleAvailable (Customer cust) {
            var isAvailable = false;
            foreach (var cusVech in cust.CustomerVechicles) {
                var vech = context.CustomerVechicles.Find (cusVech.Id);
                if (vech != null)
                    isAvailable = true;
            }
            return isAvailable;
        }
    }
}