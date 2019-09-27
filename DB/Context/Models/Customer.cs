using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace bright_choice.Context.Models {
    public class Customer {
        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [MaxLength (20)]
        [Required]
        public string ACFormat { get; set; }

        [Required]
        public int ACNo { get; set; }

        [Required]
        [MaxLength (100)]
        public string Name { get; set; }
        public string Address { get; set; }

        [MaxLength (20)]
        public string LandlineNumber { get; set; }

        [MaxLength (20)]
        public string MobileNumber { get; set; }

        [EmailAddress]
        [MaxLength (255)]
        public string EmailId { get; set; }

        [MaxLength (200)]
        public string OfficeName { get; set; }
        public string OfficeAddress { get; set; }

        [MaxLength (20)]
        public string OfficeLandline { get; set; }

        [MaxLength (255)]
        [EmailAddress]
        public string OfficeEmail { get; set; }
        public DateTime? DOB { get; set; }
        public DateTime? WeddingAnniversary { get; set; }

        public bool? AnyOtherCar { get; set; }

        [MaxLength (2000)]
        public string InsuranceDetails { get; set; }

        [MaxLength (1000)]
        public string ServiceDetails { get; set; }

        [MaxLength (2000)]
        public string NextCarDetails { get; set; }
        public bool? ThankYou { get; set; }

        public CustomerReligionEnum Religion { get; set; }

        public CustomerNativeEnum Native { get; set; }

        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;

        public ICollection<CustomerVechicle> CustomerVechicles { get; set; }
    }
}