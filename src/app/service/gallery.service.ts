import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app-config';
import { AppSettingsService } from '../config/config-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiBaseUrl: string;

  constructor(private configService: AppSettingsService, private http: HttpClient) {
    this.apiBaseUrl = 'https://yamaguchi-backend.onrender.com/api/';
  }
 // url = 'http://localhost:3000/api/';

  createGalleryImages(data: any): Observable<any> {
    let url = `${this.apiBaseUrl}${AppConfig.createGalleryImages}`;
    return this.http.post(url, data);
  }

  getGalleryImages(): Observable<any> {
    let url = `${this.apiBaseUrl}${AppConfig.getGalleryImages}`;
    return this.http.get(url);
  }
}