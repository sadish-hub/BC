using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace bright_choice.Context.Models {
    public class EnquiryVechicle {

        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public Guid EnquiryId { get; set; }

        [Required]
        [JsonIgnore]
        public Enquiry Enquiry { get; set; }

        [Required]
        public Guid VechicleId { get; set; }

        [Required]
        public Vechicle Vechicle { get; set; }

        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
    }
}