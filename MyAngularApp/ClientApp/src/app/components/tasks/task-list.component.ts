import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItem, TaskStatus, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  template: `
    <div class="container">
      <h2>Tasks</h2>
      <div class="task-list">
        <div *ngFor="let task of tasks" class="task-card">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <div class="task-meta">
            <span class="status">Status: {{ TaskStatus[task.status] }}</span>
            <span class="priority">Priority: {{ TaskPriority[task.priority] }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 1rem;
    }
    .task-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .task-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .task-meta {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks,
      error => console.error('Error loading tasks:', error)
    );
  }
} 