using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bright_choice.Context.Models {
    public class VechicleVariant {

        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [MaxLength (200)]
        [Required]
        public string Make { get; set; }

        [MaxLength (200)]
        [Required]
        public string Model { get; set; }

        public string Variant { get; set; }

        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}