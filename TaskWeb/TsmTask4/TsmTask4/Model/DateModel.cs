using System.ComponentModel.DataAnnotations;

namespace TsmTask4.Model
{
    public class DateModel
    {
        [Key]
        public int DateId { get; set; }
        public string DateValue { get; set; }
        public bool IsOnLeave { get; set; }


        public List<Activity>? Activities { get; set; }
    }
}
