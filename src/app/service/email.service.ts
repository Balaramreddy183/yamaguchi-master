import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../config/config-service';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
 private emailurl  = 'https://yamaguchi-backend.onrender.com/';
  //private emailurl  = 'http://localhost:3000/';
  constructor(private configService: AppSettingsService, private http: HttpClient) { }

  sendEmail ( name:string, email:string, message:string, subject:string, phone:string) {
    const data = {
      name:name,
      email:email,
      message:message,
      subject:subject,
      phone:phone
    }
    let url = `${this.emailurl}${AppConfig.sendMail}`;
    return this.http.post(url, data);
  }

  getEmails(): Observable<any> {
    let url = `${this.emailurl}${AppConfig.getEmails}`;
    return this.http.get(url);
  }

}
