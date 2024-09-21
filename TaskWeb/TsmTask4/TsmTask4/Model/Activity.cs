using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TsmTask4.Model
{
    public class Activity
    {
        [Key]
        public int ActivityId { get; set; }
        public string Project { get; set; }
        public string SubProject { get; set; }
        public string Batch { get; set; }
        public int HoursNeeded { get; set; }
        public string ActivityDescription { get; set; }


        public int DateId { get; set; }
        [JsonIgnore]
        [ValidateNever]
        public DateModel Date { get; set; }
    }
}
