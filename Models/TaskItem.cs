using System.ComponentModel.DataAnnotations;

namespace MyAngularApp.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        [Required]
        public TaskPriority Priority { get; set; }
        
        [Required]
        public TaskStatus Status { get; set; }
        
        public DateTime CreatedDate { get; set; }
        public DateTime? DueDate { get; set; }
        
        [Required]
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
        
        public int? AssignedToId { get; set; }
        public virtual User AssignedTo { get; set; }
    }
    
    public enum TaskPriority
    {
        Low,
        Medium,
        High,
        Critical
    }
    
    public enum TaskStatus
    {
        Todo,
        InProgress,
        Review,
        Completed
    }
} 