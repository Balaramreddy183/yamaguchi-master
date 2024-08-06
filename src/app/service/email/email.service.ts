import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailurl  = 'https://yamaguchi-backend.onrender.com/send-email';

  constructor(private http: HttpClient) { }

  sendEmail ( name:string, email:string, message:string, subject:string, phone:string) {
    const data = {
      name:name,
      email:email,
      message:message,
      subject:subject,
      phone:phone
    }
    return this.http.post(this.emailurl, data);
  }
}
