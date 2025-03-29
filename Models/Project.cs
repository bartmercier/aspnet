using System.ComponentModel.DataAnnotations;

namespace MyAngularApp.Models
{
    public class Project
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }
        
        public virtual ICollection<TaskItem> Tasks { get; set; }
    }
} 