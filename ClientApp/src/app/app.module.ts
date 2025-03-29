import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/users/user-list.component';
import { ProjectListComponent } from './components/projects/project-list.component';
import { TaskListComponent } from './components/tasks/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ProjectListComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/tasks', pathMatch: 'full' },
      { path: 'users', component: UserListComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'tasks', component: TaskListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 