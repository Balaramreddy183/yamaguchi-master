import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private apiUrl = 'https://yamaguchi-backend.onrender.com/api/total-visits'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getTotalVisits(): Observable<number> {
    return this.http.get<number>(this.apiUrl);
  }

  sendTotalVisits(visits: number): Observable<any> {
    return this.http.post(this.apiUrl, { visits });
  }
}