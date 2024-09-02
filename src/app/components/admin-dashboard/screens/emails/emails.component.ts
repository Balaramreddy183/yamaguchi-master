import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../../service/email.service';

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.css'
})
export class EmailsComponent {
  emails: any[] = [];
  isLoading: boolean = false;
  constructor(private emailService: EmailService) { }
  ngOnInit() {
    this.loadEmail();
  }
  //  loadEmails() {
  //   try {
  //     const response: any =  this.emailService.getEmails().toPromise();
  //     console.log("Response from server: ", response);
  //     this.emails = response;
  //   } catch (error) {
  //     console.error("Error loading emails", error);
  //   }
  // }
  loadEmail() {
    this.isLoading = true;
    this.emailService.getEmails().subscribe( {
      next: (res: any) => {
        this.emails = res;
        console.log('emails :: ', this.emails);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error("Error loading emails", error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  // fetchEmails() {
  //   this.emailService.getEmails().subscribe({
  //     next: (res: any) => {
  //       this.emails = res;
  //       console.log('emails :: ', this.emails);
  //     },
  //     error: (error: any) => {
  //       console.log('emails  ', error);
  //     },
  //     complete: () => {
  //     },
  //   });
  // }
}
