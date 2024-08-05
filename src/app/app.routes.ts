import { Routes } from '@angular/router';

import { HomepageDashboardComponent } from './components/admin-dashboard/homepage-dashboard/homepage-dashboard';
import { EventsComponent } from './components/admin-dashboard/screens/events/events.component';
import { TrainersComponent } from './components/admin-dashboard/screens/trainers/trainers.component';
import { HomeComponent } from './components/website/home/home.component';
import { TestimonialsComponent } from './components/admin-dashboard/screens/testimonials/testimonials.component';
import { AboutUsComponent } from './components/website/screens/about-us/about-us.component';
import { ServicesComponent } from './components/website/screens/services/services.component';
import { GalleryComponent } from './components/website/screens/gallery/gallery.component';
import { adminGalleryComponent } from './components/admin-dashboard/screens/gallery/gallery.component';
import { ContactUsComponent } from './components/website/screens/contact-us/contact-us.component';




export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },

    {
        path: 'about-us', component: AboutUsComponent
    },
    {
        path: 'gallery', component: GalleryComponent
    },
    {
        path: 'services', component: ServicesComponent
    },
    {
        path:'contact-us', component:ContactUsComponent
    },

    {
        path: 'admin-homepage', component: HomepageDashboardComponent,
    },
    {
        path: 'admin-gallery', component: adminGalleryComponent
    },
    {
        path: 'admin-events', component: EventsComponent
    },
    {
        path: 'admin-trainers', component: TrainersComponent
    },
    {
        path: 'admin-testimonials', component: TestimonialsComponent
    },


];

