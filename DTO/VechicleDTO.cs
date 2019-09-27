using System;
using System.ComponentModel.DataAnnotations;
using bright_choice.Context.Models;

namespace bright_choice.DTO {

    public class VechicleDTO {
        public Guid Id { get; set; }

        [Required]
        public CarInventoryEnum Inventory { get; set; } = CarInventoryEnum.onPremise;

        [MaxLength (200)]
        [Required]
        public string Make { get; set; }

        [MaxLength (200)]
        [Required]
        public string Model { get; set; }

        public string Variant { get; set; }

        [MaxLength (200)]
        [Required]
        public string VechicleNumber { get; set; }

        public int? Year { get; set; }
        public Decimal? Price { get; set; }

        public string Offer { get; set; }

        public string City { get; set; }
        public Decimal? EXShowRoomPrice { get; set; }
        public Decimal? OnRoadPrice { get; set; }
        public Decimal? CurrentPrice { get; set; }
        public CarStatusEnum Status { get; set; } = CarStatusEnum.available;
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}