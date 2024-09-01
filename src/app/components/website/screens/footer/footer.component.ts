import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisitService } from '../../../../service/visit.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  showBackToTop: boolean = false;
  totalVisits: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private visitService: VisitService // Inject the service
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onWindowScroll();
      this.loadAndIncrementTotalVisits(); // Load and increment total visits on init
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.pageYOffset > 300) {
        this.showBackToTop = true;
      } else {
        this.showBackToTop = false;
      }
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  loadAndIncrementTotalVisits() {
    console.log("Loading and Incrementing Total Visits");
    this.visitService.getTotalVisits().subscribe(
      (visits: number) => {
        this.totalVisits = visits + 1;
        console.log("Get Total Visits ", this.totalVisits);
        this.visitService.sendTotalVisits(this.totalVisits).subscribe(
          () => {
            console.log('Total visits updated successfully', this.totalVisits);
          },
          (error) => {
            //    console.error('Error updating total visits:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching total visits:', error);
      }
    );
  }
}