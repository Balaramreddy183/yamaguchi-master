import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../config/config-service';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private apiBaseUrl: string;

  constructor(private configService: AppSettingsService, private http: HttpClient) {
    this.apiBaseUrl = 'https://yamaguchi-backend.onrender.com/';
  }

  sendTotalVisits(visits: number): Observable<any> {
    const url = `${this.apiBaseUrl}${AppConfig.createTotalVisits}`;
    return this.http.post(url, { visits });
  }

  getTotalVisits(): Observable<number> {
    const url = `${this.apiBaseUrl}${AppConfig.getTotalVisits}`;
    return this.http.get<number>(url);
  }
}