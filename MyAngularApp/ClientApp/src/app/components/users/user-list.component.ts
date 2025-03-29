import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="container">
      <h2>Users</h2>
      <div class="user-list">
        <div *ngFor="let user of users" class="user-card">
          <h3>{{ user.name }}</h3>
          <p class="email">{{ user.email }}</p>
          <div class="user-meta">
            <span class="role">Role: {{ user.role }}</span>
            <span class="tasks">Assigned Tasks: {{ user.assignedTasks?.length || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 1rem;
    }
    .user-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .user-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .email {
      color: #666;
      margin: 0.5rem 0;
    }
    .user-meta {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => console.error('Error loading users:', error)
    );
  }
} 