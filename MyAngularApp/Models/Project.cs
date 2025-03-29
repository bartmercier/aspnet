using System.ComponentModel.DataAnnotations;

namespace MyAngularApp.Models
{
    public class Project
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public required string Name { get; set; }
        
        [Required]
        public required string Description { get; set; }
        
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime? EndDate { get; set; }
        
        [Required]
        public int UserId { get; set; }
        public required virtual User User { get; set; }
        
        public virtual ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
} 