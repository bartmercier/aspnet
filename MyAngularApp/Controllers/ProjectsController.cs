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
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(ApplicationDbContext context, ILogger<ProjectsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            _logger.LogInformation("Received GET request for all projects");
            
            try
            {
                _logger.LogInformation("Attempting to fetch projects from database");
                var projects = await _context.Projects
                    .Include(p => p.User)
                    .Include(p => p.Tasks)
                    .ToListAsync();

                _logger.LogInformation($"Successfully retrieved {projects.Count} projects from the database");
                return Ok(projects);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching projects from the database");
                return StatusCode(500, "Internal server error while fetching projects");
            }
        }

        // GET: api/projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            _logger.LogInformation($"Received GET request for project with ID {id}");

            try
            {
                _logger.LogInformation($"Attempting to fetch project with ID {id} from database");
                var project = await _context.Projects
                    .Include(p => p.User)
                    .Include(p => p.Tasks)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (project == null)
                {
                    _logger.LogWarning($"Project with ID {id} not found in the database");
                    return NotFound();
                }

                _logger.LogInformation($"Successfully retrieved project: {project.Name} (ID: {project.Id})");
                return Ok(project);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while fetching project with ID {id} from the database");
                return StatusCode(500, "Internal server error while fetching project");
            }
        }

        // GET: api/projects/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetUserProjects(int userId)
        {
            _logger.LogInformation($"Received GET request for projects of user with ID {userId}");

            try
            {
                _logger.LogInformation($"Attempting to fetch projects for user with ID {userId} from database");
                var projects = await _context.Projects
                    .Include(p => p.Tasks)
                    .Where(p => p.UserId == userId)
                    .ToListAsync();

                _logger.LogInformation($"Successfully retrieved {projects.Count} projects for user with ID {userId}");
                return Ok(projects);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while fetching projects for user with ID {userId} from the database");
                return StatusCode(500, "Internal server error while fetching user projects");
            }
        }

        // POST: api/projects
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject(Project project)
        {
            _logger.LogInformation("Received POST request to create new project");

            try
            {
                _logger.LogInformation("Attempting to create new project in database");
                _context.Projects.Add(project);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Successfully created new project: {project.Name} (ID: {project.Id})");
                return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating new project in the database");
                return StatusCode(500, "Internal server error while creating project");
            }
        }

        // PUT: api/projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, Project project)
        {
            _logger.LogInformation($"Received PUT request to update project with ID {id}");

            if (id != project.Id)
            {
                _logger.LogWarning($"ID mismatch: provided ID {id} does not match project ID {project.Id}");
                return BadRequest();
            }

            try
            {
                _logger.LogInformation($"Attempting to update project with ID {id} in database");
                _context.Entry(project).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Successfully updated project with ID {id}");
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    _logger.LogWarning($"Project with ID {id} not found in the database");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency conflict while updating project with ID {id}");
                    return StatusCode(500, "Concurrency conflict while updating project");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating project with ID {id} in the database");
                return StatusCode(500, "Internal server error while updating project");
            }
        }

        // DELETE: api/projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            _logger.LogInformation($"Received DELETE request for project with ID {id}");

            try
            {
                _logger.LogInformation($"Attempting to delete project with ID {id} from database");
                var project = await _context.Projects.FindAsync(id);
                if (project == null)
                {
                    _logger.LogWarning($"Project with ID {id} not found in the database");
                    return NotFound();
                }

                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Successfully deleted project with ID {id}");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting project with ID {id} from the database");
                return StatusCode(500, "Internal server error while deleting project");
            }
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
    }
} 