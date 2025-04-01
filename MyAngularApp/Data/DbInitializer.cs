using System;
using System.Linq;
using Microsoft.Extensions.Logging;
using MyAngularApp.Models;

namespace MyAngularApp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context, ILogger logger)
        {
            context.Database.EnsureCreated();

            // Check if there are any users
            if (context.Users.Any())
            {
                logger.LogInformation("Database already contains users. Skipping seeding.");
                return;
            }

            logger.LogInformation("Starting database seeding...");

            var users = new[]
            {
                new User
                {
                    Name = "John Doe",
                    Email = "john.doe@example.com",
                    Role = "Admin",
                    CreatedDate = DateTime.UtcNow
                },
                new User
                {
                    Name = "Jane Smith",
                    Email = "jane.smith@example.com",
                    Role = "User",
                    CreatedDate = DateTime.UtcNow
                }
            };

            logger.LogInformation($"Adding {users.Length} users to the database...");
            context.Users.AddRange(users);
            context.SaveChanges();
            logger.LogInformation("Database seeding completed successfully.");
        }
    }
} 