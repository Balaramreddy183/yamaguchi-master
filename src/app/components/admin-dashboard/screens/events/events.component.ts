import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { response } from 'express';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  eventForm: FormGroup;
  events: any;

  submitted: boolean = false;

  constructor() {
    this.eventForm = new FormGroup({
      image: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      eventdate: new FormControl('', Validators.required),
      eventtime: new FormControl('', Validators.required),
      eventlocation: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    })
  }
  ngOnInit(): void {


  }
  onSubmit() {
    this.submitted = true;
  }

}
