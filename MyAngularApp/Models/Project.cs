using System;
using System.Collections.Generic;

namespace MyAngularApp.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<TaskItem> Tasks { get; set; }
    }
} 