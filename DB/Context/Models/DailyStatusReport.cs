using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace bright_choice.Context.Models {
    public class DailyStatusReport { 
        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [MaxLength (20)]
        [Required]
        public string ACFormat { get; set; }

    }
}