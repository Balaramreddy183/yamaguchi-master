import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TestimonialsComponent } from './components/admin-dashboard/screens/testimonials/testimonials.component';
import { TrainersComponent } from './components/admin-dashboard/screens/trainers/trainers.component';
import { EventsComponent } from './components/admin-dashboard/screens/events/events.component';
import { GalleryComponent } from './components/website/screens/gallery/gallery.component';
import { adminGalleryComponent } from './components/admin-dashboard/screens/gallery/gallery.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    GalleryComponent,
    adminGalleryComponent,
    EventsComponent,
    TrainersComponent,
    TestimonialsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yamaguchi_dashboard';
}
