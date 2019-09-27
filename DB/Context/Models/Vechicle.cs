using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bright_choice.Context.Models {
    public class Vechicle {

        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public CarInventoryEnum Inventory { get; set; }

        [MaxLength (200)]
        [Required]
        public string Make { get; set; }

        [MaxLength (200)]
        [Required]
        public string Model { get; set; }

        public string Variant { get; set; }

        public int? Year { get; set; }

        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;
        public ICollection<CustomerVechicle> CustomerVechicles { get; set; }
    }
}