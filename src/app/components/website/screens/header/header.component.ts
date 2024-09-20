import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, Renderer2, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EmailService } from '../../../../service/email.service';
import { AuthService } from '../../../../service/auth.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  contactForm!: FormGroup;
  submitted: boolean = false;
  isNavbarOpen: boolean = false;
  
  isLoading: boolean = false;



  get f() {
    return this.contactForm.controls;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private emailService: EmailService,
    @Inject(ElementRef) private el: ElementRef,
    private authService: AuthService,
    public toastService: ToastService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100), Validators.minLength(10)]],
      subject: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      message: ['', [Validators.required, Validators.maxLength(20000), Validators.minLength(5)]],
    });
  }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeNavbar();
      }
    });
  }

  sendMessage() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      this.isLoading = true;
      this.emailService.sendEmail(this.contactForm.value.name, this.contactForm.value.email, this.contactForm.value.message, this.contactForm.value.subject, this.contactForm.value.phone).subscribe(
        (res) => {
          this.isLoading = false;
          console.log('Email sent', res);
          this.contactForm.reset();
          console.log('Form Reset');
          this.toastService.show('Message sent successfully', { classname: 'bg-success text-light', delay: 5000 });
        },
        (error) => {
          console.log('Error sending email', error);
          this.isLoading = false;
          this.toastService.show('Message not sent', { classname: 'bg-danger text-light', delay: 5000 });
        }
      );
    } else {
      console.log('Form is not valid');
      this.isLoading = false;
      this.toastService.show('Please fill all the fields', { classname: 'bg-danger text-light', delay: 5000 });
    }
  }

  toggleNavbar(event: Event) {
    event.stopPropagation(); // Prevent event from bubbling up
    this.isNavbarOpen = !this.isNavbarOpen;
    this.updateBodyClass();
  }

  closeNavbar() {
    this.isNavbarOpen = false;
    this.updateBodyClass();
  }

  private updateBodyClass() {
    if (this.isNavbarOpen) {
      document.body.classList.add('navbar-open');
    } else {
      document.body.classList.remove('navbar-open');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeNavbar();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 991 && this.isNavbarOpen) {
      this.closeNavbar();
    }
  }

  scrollToSection(sectionId: string) {
    this.router.navigate(['/']).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}