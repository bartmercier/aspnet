import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  template: `
    <div class="container">
      <h2>Projects</h2>
      <div class="project-list">
        <div *ngFor="let project of projects" class="project-card">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-meta">
            <span class="date">Start: {{ project.startDate | date }}</span>
            <span class="tasks">Tasks: {{ project.tasks?.length || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 1rem;
    }
    .project-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .project-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .project-meta {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
    }
  `]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects,
      error => console.error('Error loading projects:', error)
    );
  }
} 