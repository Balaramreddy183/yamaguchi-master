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
import { EmailsComponent } from './components/admin-dashboard/screens/emails/emails.component';
import { CalculatorComponent } from './components/calculator/calculator/calculator.component';
import { FighterLoginComponent } from './components/fighter/fighter-login/fighter-login.component';
import { FighterSignupComponent } from './components/fighter/fighter-signup/fighter-signup.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '', pathMatch: 'full'
    },
    {
        path: '', component: HomeComponent
    },
    {
        path: 'calculator', component: CalculatorComponent
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
        path: 'fighter/signup', component: FighterSignupComponent
    },
    {
        path: 'fighter/login', component: FighterLoginComponent
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
                path: 'emails', component: EmailsComponent
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
    },
   

    
];