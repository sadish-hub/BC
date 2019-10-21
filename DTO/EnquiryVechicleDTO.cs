using System;
using System.ComponentModel.DataAnnotations;
using bright_choice.Context.Models;
using Newtonsoft.Json;

namespace bright_choice.DTO {

    public class EnquiryVechicleDTO {
        [Key]
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
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
    }
}