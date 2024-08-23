import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryFacadeService } from '../../../../facade/gallery.facade.service';
import { Modal } from 'bootstrap';

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
  @ViewChild('staticBackdrop') staticBackdrop!: ElementRef;

  gallery: any;
  galleryForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private galleryFacadeService: GalleryFacadeService,
  ) {
    this.galleryForm = new FormGroup({
      galleryImage: new FormControl(null, [Validators.required]),
      galleryTitle: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      galleryDescription: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    });
  }

  ngOnInit(): void {
    this.loadGalleryImages();
  }

  loadGalleryImages() {
    this.galleryFacadeService.getGalleryImages().subscribe((response: any) => {
      this.gallery = response;
    });
    console.log("All Gallery Images ", this.gallery);
  }

  getImageUrl(path: string): string {
    return `http://localhost:3000/${path}`;
  }

  onSubmit() {
    this.submitted = true;
    if (this.galleryForm.valid) {
      const formData = new FormData();
      formData.append('galleryImage', this.galleryForm.get('galleryImage')?.value);
      formData.append('galleryTitle', this.galleryForm.get('galleryTitle')?.value);
      formData.append('galleryDescription', this.galleryForm.get('galleryDescription')?.value);

      this.galleryFacadeService.createGalleryImages(formData).subscribe(
        response => {
          console.log(response);
          this.loadGalleryImages(); // Reload gallery images after successful upload
          this.galleryForm.reset();
          this.submitted = false;
          this.resetFileInput();
          // this.closeModal(); // Close the modal after successful submission
        },
        error => {
          console.error('HTTP Error:', error);
        }
      );
    }
  }

  resetFileInput() {
    const fileInput = document.getElementById('formFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.galleryForm.patchValue({
        galleryImage: file
      });
    }
  }

  deleteGalleryImage(id: string) {
    this.galleryFacadeService.deleteGalleryImage(id).subscribe(
      response => {
        console.log('Image deleted successfully');
        this.loadGalleryImages(); // Reload gallery images after successful deletion
      },
      error => {
        console.error('Error deleting image:', error);
      }
    );
  }

  // editGalleryImage(galleryItem: any) {
  //   this.isEditMode = true;
  //   this.currentImageId = galleryItem._id;
  //   this.galleryForm.patchValue({
  //     galleryTitle: galleryItem.galleryTitle,
  //     galleryDescription: galleryItem.galleryDescription
  //   });
  //   // Open the modal for editing
  //   if (isPlatformBrowser(this.platformId)) {
  //     const modalElement = this.staticBackdrop.nativeElement;
  //     const modalInstance = new Modal(modalElement);
  //     modalInstance.show();
  //   }
  // }

  // closeModal() {
  //   const modalInstance = Modal.getInstance(this.staticBackdrop.nativeElement);
  //   if (modalInstance) {
  //       modalInstance.hide();
  //     }
  //   }
  }
