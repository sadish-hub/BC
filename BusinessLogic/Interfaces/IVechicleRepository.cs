using System;
using System.Collections.Generic;
using bright_choice.Context.Models;
namespace bright_choice.BusinessLogic.Interfaces {
    public interface IVechicleRepository
    {
        Vechicle Insert (Vechicle vechicle);
        Vechicle Update (Vechicle vechicle);
        IEnumerable<Vechicle> GetVechicles (string make = null);
        Vechicle GetVechicle (Guid Id);
    }
}