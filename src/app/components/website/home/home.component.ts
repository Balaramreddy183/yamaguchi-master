import { Component } from '@angular/core';
import { HeaderComponent } from '../screens/header/header.component';
import { FooterComponent } from '../screens/footer/footer.component';
import { LandingpageComponent } from '../screens/landingpage/landingpage.component';




@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, FooterComponent, LandingpageComponent]
})
export class HomeComponent {
  
}
