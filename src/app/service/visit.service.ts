import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../config/config-service';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  //private apiUrl = 'https://yamaguchi-backend.onrender.com/api/total-visits'; // Replace with your backend API URL
  private apiBaseUrl = 'http://localhost:3000/';
  constructor(private configService: AppSettingsService, private http: HttpClient) { }



  sendTotalVisits(visits: number): Observable<any> {
    let url = `${this.apiBaseUrl}${AppConfig.createTotalVisits}`;
    return this.http.post(url, { visits });
  }
  getTotalVisits(): Observable<number> {
    let url = `${this.apiBaseUrl}${AppConfig.getTotalVisits}`;
    return this.http.get<number>(url);
  }
}