import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [HomeComponent,HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  

  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  countdownExpired: boolean = false;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    const countDownDate = new Date("2024-12-15T23:59:59").getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

      if (distance < 0) {
        clearInterval(x);
        this.countdownExpired = true;
      }
    }, 1000);
  }
}
