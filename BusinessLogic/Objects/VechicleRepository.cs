using System;
using System.Collections.Generic;
using System.Linq;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context;
using bright_choice.Context.Models;

namespace bright_choice.BusinessLogic.Objects {

    public class VechicleRepository : IVechicleRepository {
        private readonly BrightChoiceContext brightChoice;
        public VechicleRepository (BrightChoiceContext brightChoice) {
            this.brightChoice = brightChoice;
        }
        public Vechicle GetVechicle (Guid Id) {
            Vechicle vechicle;
            using (var context = brightChoice) {
                vechicle = context.Vechicles.Find (Id);
            }
            return vechicle;
        }

        public IEnumerable<Vechicle> GetVechicles (string make = null) {
            List<Vechicle> vechicles = new List<Vechicle> ();
            using (var context = brightChoice) {
                var vechs = brightChoice.Vechicles.Where (i => i.Inventory == CarInventoryEnum.onPremise);
                vechicles = String.IsNullOrEmpty (make) ? vechs.ToList () : vechs.Where (i => i.Make.Contains (make)).ToList ();
            }
            return vechicles;
        }

        public Vechicle Insert (Vechicle vechicle) {
            using (var context = brightChoice) {
                context.Vechicles.Add (vechicle);
                context.SaveChanges ();
            }
            return vechicle;
        }

        public Vechicle Update (Vechicle vechicle) {
            using (var context = brightChoice) {
                var vech = context.Vechicles.Find (vechicle.Id);

                vech.Inventory = vechicle.Inventory;
                vech.Make = vechicle.Make ?? vech.Make;
                vech.Model = vechicle.Model ?? vech.Model;
                vech.UpdatedDate = DateTime.UtcNow;
                vech.Variant = vechicle.Variant ?? vech.Variant;
                vech.Year = vechicle.Year ?? vech.Year;

                context.SaveChanges ();
            }
            return vechicle;
        }
    }

}