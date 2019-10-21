using System;
using System.Collections.Generic;
using System.Linq;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context;
using bright_choice.Context.Models;
using Microsoft.EntityFrameworkCore;

namespace bright_choice.BusinessLogic.Objects {

    public class EnquiryRepository : IEnquiryRepository {
        private readonly BrightChoiceContext context;
        public EnquiryRepository (BrightChoiceContext brightChoice) {
            this.context = brightChoice;
        }
        public IEnumerable<Enquiry> GetEnquiries () {
            var enqCus = context.Enquiries.Include (j => j.Customer);
            return enqCus.Include (g => g.EnquiryVechicles).ThenInclude (n => n.Vechicle).ThenInclude (m => m.VechicleVariant);
        }
        public Enquiry GetEnquiry (Guid id) {
            var enqCus = context.Enquiries.Where (o => o.Id == id).Include (j => j.Customer);
            return enqCus.Include (m => m.EnquiryVechicles).ThenInclude (u => u.Vechicle).ThenInclude (m => m.VechicleVariant).FirstOrDefault ();
        }

        public IEnumerable<Customer> GetLeads (string name) => String.IsNullOrEmpty (name) ?
            context.Customers : context.Customers.Where (b => b.Name.Contains (name));

        public Enquiry Insert (Enquiry enquiry) {
            context.Database.EnsureCreated ();

            if (enquiry.CustomerId == Guid.Empty) {
                enquiry.Customer.ACFormat = GetACFormat ();
                enquiry.Customer.ACNo = GetACNo ();
                context.Customers.Add (enquiry.Customer);
            }
            context.Enquiries.Add (enquiry);
            context.EnquiryVechicles.AddRange (enquiry.EnquiryVechicles);
            context.SaveChanges ();
            int GetACNo () {
                var AcNoForThisMonth = context.Customers.Where (j => j.ACFormat == enquiry.Customer.ACFormat);
                return AcNoForThisMonth.Count () > 0 ? AcNoForThisMonth.Select (h => h.ACNo).Max () + 1 : 1;
            }
            return enquiry;
            string GetACFormat () => "BC41" + (checkBuyerOrSeller () ? "LEADBL" : "LEADSL") + DateTime.Now.Year + DateTime.Now.ToString ("MM");

            bool checkBuyerOrSeller () => enquiry.LeadType == LeadTypeEnum.buylead;
        }

        public Enquiry Update (Enquiry enquiry) {
            var enq = context.Enquiries.Find (enquiry.Id);
            var cust = context.Customers.Find (enq.CustomerId);
            cust.Name = enq.Customer.Name;
            cust.MobileNumber = enq.Customer.MobileNumber;
            cust.EmailId = enq.Customer.EmailId;
            cust.Address = enq.Customer.Address;
            cust.LandlineNumber = enq.Customer.LandlineNumber;

            enq.CustomerId = enquiry.CustomerId;
            enq.AlternateCar = enquiry.AlternateCar;
            enq.Budget = enquiry.Budget;
            enq.CallStatus = enquiry.CallStatus;
            enq.Comments = enquiry.Comments;
            var history = string.IsNullOrEmpty (enq.History) ? "" : enq.History;
            enq.History = $"{history}@@@@Followed up on {System.DateTime.Now}. Comments - {enquiry.Comments}";
            enq.ExactRequirement = enquiry.ExactRequirement;
            enq.NextFollowUp = enquiry.NextFollowUp;
            enq.ProvidedDetails = enquiry.ProvidedDetails;
            enq.SourcingPoint = enquiry.SourcingPoint;
            enq.Status = enquiry.Status;
            enq.UpdatedDate = DateTime.Now;

            var range = context.EnquiryVechicles.Where (i => i.EnquiryId == enquiry.Id);
            context.EnquiryVechicles.RemoveRange (range);
            context.EnquiryVechicles.AddRange (enquiry.EnquiryVechicles);

            context.SaveChanges ();
            return enq;
        }
    }
}