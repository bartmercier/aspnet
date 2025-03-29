import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { TaskItem, TaskStatus, TaskPriority } from '../../models/task.model';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-task-list',
  template: `
    <div class="container mt-4">
      <h2>Tasks</h2>
      <button class="btn btn-primary mb-3" (click)="showAddTaskForm = true">Add Task</button>

      <div *ngIf="showAddTaskForm" class="card mb-3">
        <div class="card-body">
          <h3>Add New Task</h3>
          <form (ngSubmit)="createTask()">
            <div class="form-group">
              <label>Title:</label>
              <input type="text" class="form-control" [(ngModel)]="newTask.title" name="title" required>
            </div>
            <div class="form-group">
              <label>Description:</label>
              <textarea class="form-control" [(ngModel)]="newTask.description" name="description"></textarea>
            </div>
            <div class="form-group">
              <label>Project:</label>
              <select class="form-control" [(ngModel)]="newTask.projectId" name="projectId" required>
                <option *ngFor="let project of projects" [value]="project.id">{{ project.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Priority:</label>
              <select class="form-control" [(ngModel)]="newTask.priority" name="priority" required>
                <option [value]="TaskPriority.Low">Low</option>
                <option [value]="TaskPriority.Medium">Medium</option>
                <option [value]="TaskPriority.High">High</option>
                <option [value]="TaskPriority.Critical">Critical</option>
              </select>
            </div>
            <div class="form-group">
              <label>Assign To:</label>
              <select class="form-control" [(ngModel)]="newTask.assignedToId" name="assignedToId">
                <option [value]="null">Unassigned</option>
                <option *ngFor="let user of users" [value]="user.id">{{ user.name }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-success mr-2">Save</button>
            <button type="button" class="btn btn-secondary" (click)="showAddTaskForm = false">Cancel</button>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3" *ngFor="let status of taskStatuses">
          <div class="card mb-3">
            <div class="card-header">{{ TaskStatus[status] }}</div>
            <div class="card-body">
              <div class="task-list">
                <div class="card mb-2" *ngFor="let task of getTasksByStatus(status)">
                  <div class="card-body">
                    <h6 class="card-title">{{ task.title }}</h6>
                    <p class="card-text">{{ task.description }}</p>
                    <p class="card-text">
                      <small>
                        Priority: {{ TaskPriority[task.priority] }}<br>
                        Assigned: {{ task.assignedTo?.name || 'Unassigned' }}
                      </small>
                    </p>
                    <div class="btn-group">
                      <button class="btn btn-sm btn-info" (click)="updateStatus(task)">Move</button>
                      <button class="btn btn-sm btn-danger" (click)="deleteTask(task.id)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  projects: Project[] = [];
  users: User[] = [];
  showAddTaskForm = false;
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;
  taskStatuses = [TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Review, TaskStatus.Completed];

  newTask: TaskItem = {
    title: '',
    description: '',
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    createdDate: new Date(),
    projectId: 0
  };

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
    this.loadUsers();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks,
      error => console.error('Error loading tasks', error)
    );
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects,
      error => console.error('Error loading projects', error)
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => console.error('Error loading users', error)
    );
  }

  getTasksByStatus(status: TaskStatus): TaskItem[] {
    return this.tasks.filter(task => task.status === status);
  }

  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe(
      task => {
        this.tasks.push(task);
        this.showAddTaskForm = false;
        this.newTask = {
          title: '',
          description: '',
          priority: TaskPriority.Medium,
          status: TaskStatus.Todo,
          createdDate: new Date(),
          projectId: 0
        };
      },
      error => console.error('Error creating task', error)
    );
  }

  updateStatus(task: TaskItem): void {
    if (task.id) {
      const newStatus = (task.status + 1) % 4;
      this.taskService.updateTaskStatus(task.id, newStatus).subscribe(
        () => {
          task.status = newStatus;
        },
        error => console.error('Error updating task status', error)
      );
    }
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(
        () => this.tasks = this.tasks.filter(task => task.id !== id),
        error => console.error('Error deleting task', error)
      );
    }
  }
} 