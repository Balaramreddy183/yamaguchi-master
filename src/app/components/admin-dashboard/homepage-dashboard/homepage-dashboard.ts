import { Component } from '@angular/core';
import { HeaderComponent } from '../screens/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet,RouterModule],
  templateUrl: './homepage-dashboard.html',
  styleUrl: './homepage-dashboard.css'
})
export class HomepageDashboardComponent {
 
}
