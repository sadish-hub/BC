using System;
using System.Collections.Generic;
using System.Linq;
using bright_choice.BusinessLogic.Interfaces;
using bright_choice.Context;
using bright_choice.Context.Models;

namespace bright_choice.BusinessLogic.Objects {

    public class VechicleVariantRepository : IVechicleVariantRepository {
        private readonly BrightChoiceContext context;
        public VechicleVariantRepository (BrightChoiceContext brightChoice) {
            this.context = brightChoice;
        }

        public VechicleVariant GetVechicleVariant (Guid Id) => context.VechicleVariants.Find (Id);

        public IEnumerable<VechicleVariant> GetVechicleVariants (string make = null) =>
            String.IsNullOrEmpty (make) ? context.VechicleVariants : context.VechicleVariants.Where (j => j.Make.StartsWith(make));

        public VechicleVariant Insert (VechicleVariant vechicle) {
            context.Database.EnsureCreated ();

            context.VechicleVariants.Add (vechicle);
            context.SaveChanges ();
            return vechicle;
        }

        public VechicleVariant Update (VechicleVariant vechicle) {
            var vechVari = context.VechicleVariants.Find (vechicle.Id);

            if (vechVari != null) {
                vechVari.Make = vechicle.Make;
                vechVari.Model = vechicle.Model;
                vechVari.Variant = vechicle.Variant;
                vechVari.UpdatedDate = DateTime.UtcNow;

                context.SaveChanges ();
            }
            return vechicle;
        }
    }
}