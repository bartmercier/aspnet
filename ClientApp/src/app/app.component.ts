import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Task Manager</a>
        <div class="navbar-nav">
          <a class="nav-item nav-link" routerLink="/tasks" routerLinkActive="active">Tasks</a>
          <a class="nav-item nav-link" routerLink="/projects" routerLinkActive="active">Projects</a>
          <a class="nav-item nav-link" routerLink="/users" routerLinkActive="active">Users</a>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { } 