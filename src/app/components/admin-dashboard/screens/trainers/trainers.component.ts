import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent {

  trainersForm: FormGroup;

  constructor() {
    this.trainersForm = new FormGroup({
      trainerImage: new FormControl('', [Validators.required]),
      trainerName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      trainerQualification: new FormControl('', [Validators.required, Validators.minLength(3),]),
      trainerExperience: new FormControl('', [Validators.required, Validators.minLength(1),Validators.maxLength(3)]),
     
    })
  }


}
