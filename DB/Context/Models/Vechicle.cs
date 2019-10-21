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
        public Guid VechicleVariantId { get; set; }

        [Required]
        public VechicleVariant VechicleVariant { get; set; }

        [Required]
        public CarInventoryEnum Inventory { get; set; }

        public int? Year { get; set; }

        [MaxLength (200)]
        [Required]
        public string VechicleNumber { get; set; }

        public int? Kilometer { get; set; }
        public string Registration { get; set; }

        [Column (TypeName = "decimal(18, 6)")]
        public Decimal? Budget { get; set; }

        [MaxLength (100)]
        public string SellerName { get; set; }

        [MaxLength (20)]
        public string SellerContactNumber { get; set; }

        public bool? RC { get; set; }

        public bool? Insurance { get; set; }

        public CarStatusEnum Status { get; set; } = CarStatusEnum.available;

        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;
        public ICollection<CustomerVechicle> CustomerVechicles { get; set; }
        public ICollection<EnquiryVechicle> EnquiryVechicles { get; set; }
    }
}