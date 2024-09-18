import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../service/toast.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,     
  ],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  passwordFieldType: string = 'password';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public toastService: ToastService,
    
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/homepage']);
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe(response => {
       
        if (response) {         
          this.toastService.show('Login successful!', { classname: 'bg-success text-light', delay: 10000 });
          setTimeout(() => {
            this.router.navigate(['/admin/homepage'] , { replaceUrl: true });
          }, 1000);
          this.isLoading = false;
        } else {
          this.toastService.show('Invalid username or password', { classname: 'bg-danger text-light', delay: 5000 });
          this.errorMessage = 'Invalid username or password';
          this.isLoading = false;
        }
      });
    }
  }
}