using System;
using System.Collections.Generic;
using System.Linq;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context;
using bright_choice.Context.Models;
using Microsoft.EntityFrameworkCore;

namespace bright_choice.BusinessLogic.Objects {

    public class VechicleRepository : IVechicleRepository {
        private readonly BrightChoiceContext context;
        public VechicleRepository (BrightChoiceContext brightChoice) {
            this.context = brightChoice;
        }
        public Vechicle GetVechicle (Guid Id) =>
            context.Vechicles.Where (p => p.Id == Id).Include (j => j.VechicleVariant).FirstOrDefault ();

        public IEnumerable<Vechicle> GetVechicles (IDictionary<string, string> searchCollection) {
            IQueryable<Vechicle> filteredVechicles = context.Vechicles.AsQueryable ();
            foreach (var item in searchCollection) {
                switch (item.Key) {
                    case "vechicleNumber":
                        filteredVechicles = filteredVechicles.Where (k => k.VechicleNumber == item.Value);
                        break;

                    case "selectedVariantIds":
                        var ids = String.IsNullOrEmpty (item.Value) ? new List<Guid> () : item.Value.Split (',').Select (Guid.Parse).ToList ();
                        filteredVechicles = filteredVechicles.Where (l => ids.Contains(l.VechicleVariantId));
                        break;

                    case "year":
                        if (!String.IsNullOrEmpty (item.Value))
                            filteredVechicles = filteredVechicles.Where (i => i.Year == Convert.ToInt32 (item.Value));
                        break;

                    case "registration":
                        if (!String.IsNullOrEmpty (item.Value))
                            filteredVechicles = filteredVechicles.Where (k => k.Registration == item.Value);
                        break;

                    case "kilometer":
                        if (!String.IsNullOrEmpty (item.Value))
                            filteredVechicles = filteredVechicles.Where (j => j.Kilometer <= Convert.ToInt32 (item.Value));
                        break;

                    case "budget":
                        if (!String.IsNullOrEmpty (item.Value))
                            filteredVechicles = filteredVechicles.Where (j => j.Budget <= Convert.ToDecimal (item.Value));
                        break;

                    default:
                        break;
                }
            }
            return filteredVechicles.Include (i => i.VechicleVariant).OrderBy (m => m.Inventory).ToList ();
        }

        public Vechicle Insert (Vechicle vechicle) {
            context.Database.EnsureCreated ();

            context.Vechicles.Add (vechicle);
            context.SaveChanges ();
            return vechicle;
        }

        public Vechicle Update (Vechicle vechicle) {
            var vech = context.Vechicles.Find (vechicle.Id);

            vech.Budget = vechicle.Budget;
            vech.Insurance = vechicle.Insurance;
            vech.Inventory = vechicle.Inventory;
            vech.Kilometer = vechicle.Kilometer;
            vech.RC = vechicle.RC;
            vech.Registration = vechicle.Registration;
            vech.SellerContactNumber = vechicle.SellerContactNumber;
            vech.SellerName = vechicle.SellerName;
            vech.Status = vechicle.Status;
            vech.VechicleNumber = vechicle.VechicleNumber;
            vech.Year = vech.Year;
            vech.UpdatedDate = DateTime.UtcNow;
            vech.Year = vechicle.Year ?? vech.Year;

            context.SaveChanges ();
            return vechicle;
        }
    }

}