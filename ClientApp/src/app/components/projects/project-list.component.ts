import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-project-list',
  template: `
    <div class="container mt-4">
      <h2>Projects</h2>
      <button class="btn btn-primary mb-3" (click)="showAddProjectForm = true">Add Project</button>

      <div *ngIf="showAddProjectForm" class="card mb-3">
        <div class="card-body">
          <h3>Add New Project</h3>
          <form (ngSubmit)="createProject()">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" class="form-control" [(ngModel)]="newProject.name" name="name" required>
            </div>
            <div class="form-group">
              <label>Description:</label>
              <textarea class="form-control" [(ngModel)]="newProject.description" name="description"></textarea>
            </div>
            <div class="form-group">
              <label>Owner:</label>
              <select class="form-control" [(ngModel)]="newProject.userId" name="userId" required>
                <option *ngFor="let user of users" [value]="user.id">{{ user.name }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-success mr-2">Save</button>
            <button type="button" class="btn btn-secondary" (click)="showAddProjectForm = false">Cancel</button>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3" *ngFor="let project of projects">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ project.name }}</h5>
              <p class="card-text">{{ project.description }}</p>
              <p class="card-text"><small>Owner: {{ project.user?.name }}</small></p>
              <p class="card-text"><small>Started: {{ project.startDate | date }}</small></p>
              <button class="btn btn-info btn-sm mr-2" (click)="viewTasks(project)">View Tasks</button>
              <button class="btn btn-danger btn-sm" (click)="deleteProject(project.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  users: User[] = [];
  showAddProjectForm = false;
  newProject: Project = {
    name: '',
    description: '',
    startDate: new Date(),
    userId: 0
  };

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();
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

  createProject(): void {
    this.projectService.createProject(this.newProject).subscribe(
      project => {
        this.projects.push(project);
        this.showAddProjectForm = false;
        this.newProject = { name: '', description: '', startDate: new Date(), userId: 0 };
      },
      error => console.error('Error creating project', error)
    );
  }

  viewTasks(project: Project): void {
    // Implement navigation to tasks view
    console.log('View tasks for project:', project.id);
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      // Implement delete functionality
      console.log('Delete project:', id);
    }
  }
} 