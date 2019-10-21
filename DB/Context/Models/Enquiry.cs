using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
namespace bright_choice.Context.Models {
    public class Enquiry {
        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public SourcingPointEnum SourcingPoint { get; set; }

        [Required]
        public Guid CustomerId { get; set; }

        [Required]
        public Customer Customer { get; set; }

        public int? Year { get; set; }
        public int? Kilometer { get; set; }
        public string Registration { get; set; }

        [Column (TypeName = "decimal(18, 6)")]
        public Decimal? Budget { get; set; }
        public bool ProvidedDetails { get; set; }
        public DateTime? NextFollowUp { get; set; }
        public CallStatusEnum CallStatus { get; set; }
        public string Comments { get; set; }

        [MaxLength (2000)]
        public string ExactRequirement { get; set; }

        [MaxLength (1000)]
        public string AlternateCar { get; set; }
        public EnquiryStatusEnum Status { get; set; }
        public string History { get; set; }
        public string Assignee { get; set; }
        public LeadTypeEnum LeadType { get; set; }

        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;
        public ICollection<EnquiryVechicle> EnquiryVechicles { get; set; }

    }
}