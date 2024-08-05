import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { GetService } from '../../../../service/apis/get.service';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class adminGalleryComponent implements OnInit {

  gallery: any;
  galleryForm: FormGroup;
  submitted: boolean = false;

  constructor(public productGetApi: GetService) {

    this.galleryForm = new FormGroup({
      image: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      description: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),

    })
  }
  ngOnInit(): void {
    this.productGetApi.getGallery().subscribe((response: any) => {
      this.gallery = response.products;
    })

  }

  onSubmit() {
    this.submitted = true;
    if (this.galleryForm.valid) {
      console.log(this.galleryForm.value);
    }
  }




}
