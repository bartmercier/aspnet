using System.ComponentModel.DataAnnotations;

namespace MyAngularApp.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public required string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        
        [Required]
        public required string Role { get; set; }
        
        public DateTime CreatedDate { get; set; }
        
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
        public virtual ICollection<TaskItem> AssignedTasks { get; set; } = new List<TaskItem>();
    }
} 