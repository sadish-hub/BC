using System;
using System.ComponentModel.DataAnnotations;
using bright_choice.Context.Models;
using Newtonsoft.Json;

namespace bright_choice.DTO {

    public class CustomerVechicleDTO {

        public Guid Id { get; set; }
        public CustomerTypeEnum Type { get; set; } = CustomerTypeEnum.buyer;
        public Guid CustomerId { get; set; }

        [JsonIgnore]
        public Customer Customer { get; set; }

        public Guid VechicleId { get; set; }

        [JsonIgnore]
        public Vechicle Vechicle { get; set; }

        [MaxLength (200)]
        public string VechicleNumber { get; set; }

        public Decimal? Budget { get; set; }

        [MaxLength (100)]
        public string SellerName { get; set; }

        [MaxLength (20)]
        public string SellerContactNumber { get; set; }

        [MaxLength (200)]
        public string Bank { get; set; }

        public decimal? LoanAmount { get; set; }

        [MaxLength (100)]
        public string BankAccNo { get; set; }

        public int? Tenor { get; set; }

        public decimal? EMI { get; set; }

        public DateTime? EMIDate { get; set; }

        public bool? RC { get; set; }

        public bool? Insurance { get; set; }

        public CarStatusEnum Status { get; set; } = CarStatusEnum.available;
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;

    }
}