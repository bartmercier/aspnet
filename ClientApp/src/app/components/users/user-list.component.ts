import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="container mt-4">
      <h2>Users</h2>
      <button class="btn btn-primary mb-3" (click)="showAddUserForm = true">Add User</button>

      <div *ngIf="showAddUserForm" class="card mb-3">
        <div class="card-body">
          <h3>Add New User</h3>
          <form (ngSubmit)="createUser()">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" class="form-control" [(ngModel)]="newUser.name" name="name" required>
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" class="form-control" [(ngModel)]="newUser.email" name="email" required>
            </div>
            <div class="form-group">
              <label>Role:</label>
              <input type="text" class="form-control" [(ngModel)]="newUser.role" name="role" required>
            </div>
            <button type="submit" class="btn btn-success mr-2">Save</button>
            <button type="button" class="btn btn-secondary" (click)="showAddUserForm = false">Cancel</button>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 mb-3" *ngFor="let user of users">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ user.name }}</h5>
              <p class="card-text">{{ user.email }}</p>
              <p class="card-text"><small>Role: {{ user.role }}</small></p>
              <button class="btn btn-danger btn-sm" (click)="deleteUser(user.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  showAddUserForm = false;
  newUser: User = { name: '', email: '', role: '' };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => console.error('Error loading users', error)
    );
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(
      user => {
        this.users.push(user);
        this.showAddUserForm = false;
        this.newUser = { name: '', email: '', role: '' };
      },
      error => console.error('Error creating user', error)
    );
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => this.users = this.users.filter(user => user.id !== id),
        error => console.error('Error deleting user', error)
      );
    }
  }
} 