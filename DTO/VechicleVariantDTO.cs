using System;
using System.ComponentModel.DataAnnotations;

namespace bright_choice.DTO {

    public class VechicleVariantDTO {
        [Key]
        public Guid Id { get; set; }

        [MaxLength (200)]
        [Required]
        public string Make { get; set; }

        [MaxLength (200)]
        [Required]
        public string Model { get; set; }

        public string Variant { get; set; }
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}