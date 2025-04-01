using System;
using System.Collections.Generic;

namespace MyAngularApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime? CreatedDate { get; set; }
        
        public ICollection<Project> Projects { get; set; }
        public ICollection<TaskItem> AssignedTasks { get; set; }
    }
} 