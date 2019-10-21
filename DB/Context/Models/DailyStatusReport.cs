using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace bright_choice.Context.Models {
    public class DailyStatusReport {
        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [MaxLength (500)]
        public string WebStatus { get; set; }
        public int? TotalNoOfCar { get; set; }
        public bool? WithPhotos { get; set; }
        public string MoreThan30Days { get; set; }
        public InfoViaEnum InfoVia { get; set; }
        public int? FreshCall { get; set; }
        public int? OldCall { get; set; }
        public int? DealerCall { get; set; }
        public int? TotalCall { get; set; }
        public int? NoOfAppointment { get; set; }
        public int? NoOfAdvanceRecd { get; set; }
        public int? NoOfCarsSold { get; set; }
        [MaxLength(500)]
        public string Executive { get; set; }

        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        [DatabaseGenerated (DatabaseGeneratedOption.None)]
        public DateTime? UpdatedDate { get; set; } = DateTime.UtcNow;

    }
}