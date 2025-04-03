using System;
using System.Linq;
using MyAngularApp7.Models;

namespace MyAngularApp7.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;
            }

            var users = new[]
            {
                new User { Name = "John Doe", Email = "john@example.com", Role = "Admin", CreatedDate = DateTime.Now },
                new User { Name = "Jane Smith", Email = "jane@example.com", Role = "User", CreatedDate = DateTime.Now }
            };

            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
} 