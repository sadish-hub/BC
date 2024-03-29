using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace bright_choice.Context.Models {
    public class CustomerVechicle {

        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public CustomerTypeEnum Type { get; set; }

        [Required]
        public Guid CustomerId { get; set; }

        [Required]
        [JsonIgnore]
        public Customer Customer { get; set; }

        [Required]
        public Guid VechicleId { get; set; }

        [Required]
        [JsonIgnore]
        public Vechicle Vechicle { get; set; }

        [MaxLength (200)]
        public string Bank { get; set; }

        [Column (TypeName = "decimal(18, 6)")]
        public decimal? LoanAmount { get; set; }

        [MaxLength (100)]
        public string BankAccNo { get; set; }

        public int? Tenor { get; set; }

        [Column (TypeName = "decimal(18, 6)")]
        public decimal? EMI { get; set; }

        public DateTime? EMIDate { get; set; }

        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

        [DatabaseGenerated (DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;

    }
}