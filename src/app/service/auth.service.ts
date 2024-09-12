import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppConfig } from '../config/app-config';
import { AppLocalStorage } from './app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000/'; 

  private apiUrl = 'https://yamaguchi-backend.onrender.com/'; 
  constructor(private http: HttpClient, private router: Router, private localStorage: AppLocalStorage) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    const url = `${this.apiUrl}${AppConfig.login}`;
    console.log('Login URL:', url); // Debugging line to check the URL
    console.log('Payload:', credentials); // Debugging line to check the payload
    
    return this.http.post<any>(url, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.localStorage.setItem('authToken', response.token);
          this.localStorage.setItem('userDetails', JSON.stringify(response.user));
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(null);
      })
    );
  }

  logout(): void {
    this.localStorage.removeItem('authToken');
    this.localStorage.removeItem('userDetails');
    this.router.navigate(['/']);
    
  }

  isLoggedIn(): boolean {
    return !!this.localStorage.getItem('authToken');
  }

  getUserDetails(): any {
    const userDetails = this.localStorage.getItem('userDetails');
    return userDetails ? JSON.parse(userDetails) : null;
  }
}