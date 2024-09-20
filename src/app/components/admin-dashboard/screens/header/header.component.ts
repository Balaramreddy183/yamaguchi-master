import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { AppLocalStorage } from '../../../../service/app-storage.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorage: AppLocalStorage,
    public toastService: ToastService,

  ) { }
  isLoading: boolean = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.isLoading = true;
    this.localStorage.removeItem('authToken');
    this.localStorage.removeItem('userDetails');
    this.toastService.show('Logout successful!', { classname: 'bg-success text-light', delay: 1000 });
    setTimeout(() => {
      this.router.navigate(['/'] , { replaceUrl: true });
    }, 1000);

    this.isLoading = false;
  }
}