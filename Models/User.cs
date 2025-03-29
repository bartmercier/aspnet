using System.ComponentModel.DataAnnotations;

namespace MyAngularApp.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        public string Role { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<TaskItem> AssignedTasks { get; set; }
    }
} 