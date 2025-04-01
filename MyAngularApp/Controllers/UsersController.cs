using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyAngularApp.Data;
using MyAngularApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MyAngularApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UsersController> _logger;

        public UsersController(ApplicationDbContext context, ILogger<UsersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            _logger.LogInformation("Received GET request for all users");
            
            try
            {
                _logger.LogInformation("Attempting to fetch users from database");
                var users = await _context.Users
                    .Include(u => u.Projects)
                    .Include(u => u.AssignedTasks)
                    .ToListAsync();

                _logger.LogInformation($"Successfully retrieved {users.Count} users from the database");
                foreach (var user in users)
                {
                    _logger.LogInformation($"User: {user.Name} (ID: {user.Id}, Email: {user.Email}, Role: {user.Role})");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching users from the database");
                return StatusCode(500, "Internal server error while fetching users");
            }
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            _logger.LogInformation($"Received GET request for user with ID {id}");

            try
            {
                _logger.LogInformation($"Attempting to fetch user with ID {id} from database");
                var user = await _context.Users
                    .Include(u => u.Projects)
                    .Include(u => u.AssignedTasks)
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (user == null)
                {
                    _logger.LogWarning($"User with ID {id} not found in the database");
                    return NotFound();
                }

                _logger.LogInformation($"Successfully retrieved user: {user.Name} (ID: {user.Id}, Email: {user.Email}, Role: {user.Role})");
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while fetching user with ID {id} from the database");
                return StatusCode(500, "Internal server error while fetching user");
            }
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            _logger.LogInformation("Received POST request to create new user");

            try
            {
                _logger.LogInformation("Attempting to create new user in database");
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Successfully created new user: {user.Name} (ID: {user.Id}, Email: {user.Email}, Role: {user.Role})");
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating new user in the database");
                return StatusCode(500, "Internal server error while creating user");
            }
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            _logger.LogInformation($"Received PUT request to update user with ID {id}");

            if (id != user.Id)
            {
                _logger.LogWarning($"ID mismatch: provided ID {id} does not match user ID {user.Id}");
                return BadRequest();
            }

            try
            {
                _logger.LogInformation($"Attempting to update user with ID {id} in database");
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Successfully updated user with ID {id}");
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    _logger.LogWarning($"User with ID {id} not found in the database");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency conflict while updating user with ID {id}");
                    return StatusCode(500, "Concurrency conflict while updating user");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating user with ID {id} in the database");
                return StatusCode(500, "Internal server error while updating user");
            }
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            _logger.LogInformation($"Received DELETE request for user with ID {id}");

            try
            {
                _logger.LogInformation($"Attempting to delete user with ID {id} from database");
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    _logger.LogWarning($"User with ID {id} not found in the database");
                    return NotFound();
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Successfully deleted user with ID {id}");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting user with ID {id} from the database");
                return StatusCode(500, "Internal server error while deleting user");
            }
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
} 