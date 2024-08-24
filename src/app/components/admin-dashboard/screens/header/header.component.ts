import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  isLoading: boolean = false;
  logout(): void {
    this.isLoading = true;
    this.authService.logout();
    alert('You have been logged out.');
    this.isLoading = false;
  }
}