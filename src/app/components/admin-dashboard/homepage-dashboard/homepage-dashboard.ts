import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../screens/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { GalleryFacadeService } from '../../../facade/gallery.facade.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterModule, HttpClientModule,CommonModule],
  templateUrl: './homepage-dashboard.html',
  styleUrl: './homepage-dashboard.css'
})
export class HomepageDashboardComponent implements OnInit {
  gallery: any[] = [];
  constructor(private galleryFacadeService: GalleryFacadeService) {

  }
  ngOnInit(): void {
    this.getGalleryImages();
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
}
