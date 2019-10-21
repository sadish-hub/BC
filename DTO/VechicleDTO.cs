using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using bright_choice.Context.Models;
using Newtonsoft.Json;

namespace bright_choice.DTO {

    public class VechicleDTO {
        public Guid Id { get; set; }

        public Guid VechicleVariantId { get; set; }

        public VechicleVariantDTO VechicleVariant { get; set; }

        public CarInventoryEnum Inventory { get; set; } = CarInventoryEnum.onPremise;

        public int? Year { get; set; }

        [MaxLength (200)]
        public string VechicleNumber { get; set; }

        public int? Kilometer { get; set; }
        public string Registration { get; set; }

        public Decimal? Budget { get; set; }

        [MaxLength (100)]
        public string SellerName { get; set; }

        [MaxLength (20)]
        public string SellerContactNumber { get; set; }

        public bool? RC { get; set; }

        public bool? Insurance { get; set; }
        public CarStatusEnum Status { get; set; } = CarStatusEnum.available;
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public ICollection<VechicleVariantDTO> VechicleVariants { get; set; }
    }
}