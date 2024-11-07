import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { AppSettingsService } from '../config/config-service';
import { Observable } from 'rxjs';
import { AppLocalStorage } from './app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiBaseUrl: string;

  constructor(
    private configService: AppSettingsService, 
    private http: HttpClient,
    private storageService: AppLocalStorage
  ) {
    // this.apiBaseUrl = 'https://yamaguchi-backend.onrender.com/';
    this.apiBaseUrl = 'http://localhost:3000/';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.storageService.getItem('authToken')}` // Include the token in the Authorization header
    });
  }

  getAllTrainerDetails(): Observable<any> {
    let url = `${this.apiBaseUrl}${AppConfig.getAllTrainerDetails}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createTrainerDetails(data: FormData): Observable<any> {
    let url = `${this.apiBaseUrl}${AppConfig.createTrainerDetails}`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  updateTrainerDetails(id: string, data: any): Observable<any> {
    let url = `${this.apiBaseUrl}${AppConfig.updateTrainerDetails}/${id}`;
    return this.http.put(url, data, { headers: this.getHeaders() });
  }

  deleteTrainerDetails(_id: string): Observable<any> {
    let url = `${this.apiBaseUrl}${AppConfig.deleteTrainerDetails}/${_id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
