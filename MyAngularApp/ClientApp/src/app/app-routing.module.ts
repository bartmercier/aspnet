import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './components/tasks/task-list.component';
import { ProjectListComponent } from './components/projects/project-list.component';
import { UserListComponent } from './components/users/user-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'users', component: UserListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 