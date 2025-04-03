using System;

namespace MyAngularApp7.Models
{
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

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskPriority Priority { get; set; }
        public TaskStatus Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public int? AssignedToId { get; set; }
        public User AssignedTo { get; set; }
    }
} 