import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../screens/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { GalleryFacadeService } from '../../../facade/gallery.facade.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../service/email.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './homepage-dashboard.html',
  styleUrl: './homepage-dashboard.css'
})
export class HomepageDashboardComponent implements OnInit {
  gallery: any[] = [];
  emails: any[] = [];
  constructor(
    private galleryFacadeService: GalleryFacadeService,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.getGalleryImages();
    this.loadEmail();
  }
  getGalleryImages() {
    this.galleryFacadeService.getGalleryImages().subscribe((response: any) => {
      this.gallery = response.map((item: any) => ({
        ...item,
        filename: `data:image/png;base64,${item.filename}`
      }));
      console.log("All Gallery Images ", this.gallery.length);
    });
  }
  loadEmail() {
    this.emailService.getEmails().subscribe({
      next: (res: any) => {
        this.emails = res;
        console.log('emails :: ', this.emails.length);
      },
      error: (error: any) => {
        console.error("Error loading emails", error);
      },
      complete: () => {
      },
    });
  }
}
