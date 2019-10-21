using System;
using System.Collections.Generic;
using bright_choice.Context.Models;
namespace bright_choice.BusinessLogic.Interfaces {
    public interface IVechicleVariantRepository {
        VechicleVariant Insert (VechicleVariant vechicle);
        VechicleVariant Update (VechicleVariant vechicle);
        IEnumerable<VechicleVariant> GetVechicleVariants (string make = null);
        VechicleVariant GetVechicleVariant (Guid Id);
    }
}