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
import { AdminLoginComponent } from './components/auth/admin-login/admin-login.component';
import { AuthGuard } from './service/admin-auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },
    // {
    //     path: 'about-us', component: AboutUsComponent
    // },
    // {
    //     path: 'gallery', component: GalleryComponent
    // },
    // {
    //     path: 'services', component: ServicesComponent
    // },
    // {
    //     path:'contact-us', component:ContactUsComponent
    // },
    {
        path: 'admin/login', component: AdminLoginComponent
    },
    {
        path: 'admin', 
        canActivate: [AuthGuard],
        children: [
            {
                path: 'homepage', component: HomepageDashboardComponent
            },
            {
                path: 'gallery', component: adminGalleryComponent
            },
            {
                path: 'events', component: EventsComponent
            },
            {
                path: 'trainers', component: TrainersComponent
            },
            {
                path: 'testimonials', component: TestimonialsComponent
            }
        ]
    },
    {
        path: '**', component: HomeComponent
    }
];