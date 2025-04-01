import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    console.log('Fetching users from:', this.apiUrl);
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap({
        next: (users) => console.log('Successfully fetched users:', users),
        error: (error) => console.error('Error fetching users:', error)
      })
    );
  }

  getUser(id: number): Observable<User> {
    console.log(`Fetching user with ID ${id} from:`, `${this.apiUrl}/${id}`);
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: (user) => console.log('Successfully fetched user:', user),
        error: (error) => console.error('Error fetching user:', error)
      })
    );
  }

  createUser(user: User): Observable<User> {
    console.log('Creating new user:', user);
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap({
        next: (createdUser) => console.log('Successfully created user:', createdUser),
        error: (error) => console.error('Error creating user:', error)
      })
    );
  }

  updateUser(id: number, user: User): Observable<void> {
    console.log(`Updating user with ID ${id}:`, user);
    return this.http.put<void>(`${this.apiUrl}/${id}`, user).pipe(
      tap({
        next: () => console.log('Successfully updated user'),
        error: (error) => console.error('Error updating user:', error)
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    console.log(`Deleting user with ID ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => console.log('Successfully deleted user'),
        error: (error) => console.error('Error deleting user:', error)
      })
    );
  }
} 