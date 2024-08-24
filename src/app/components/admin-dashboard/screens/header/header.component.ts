import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterOutlet,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    alert('You have been logged out.');
  }
}