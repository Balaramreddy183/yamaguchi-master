import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryFacadeService } from '../../../../facade/gallery.facade.service';
import * as bootstrap from 'bootstrap';

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
  isLoading: boolean = false;
  fileError: string = '';

  constructor(
    private galleryFacadeService: GalleryFacadeService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.galleryForm = new FormGroup({
      galleryImage: new FormControl(null, [Validators.required]),
      galleryTitle: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      galleryDescription: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    });
  }

  ngOnInit(): void {
    this.loadGalleryImages();
    this.titleService.setTitle('Gallery - Yamaguchi Karate Academy');
    this.metaService.addTags([
      { name: 'description', content: 'View the gallery of Yamaguchi Karate Academy. See our students in action and the events we host.' },
      { name: 'keywords', content: 'karate, gallery, Yamaguchi Karate Academy, Hyderabad, martial arts' }
    ]);
  }

  loadGalleryImages() {
    this.isLoading = true;
    this.galleryFacadeService.getGalleryImages().subscribe((response: any) => {
      this.gallery = response.map((item: any) => ({
        ...item,
        filename: `data:image/png;base64,${item.filename}`
      }));
      this.isLoading = false;
      console.log("All Gallery Images ", this.gallery);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.galleryForm.valid && !this.fileError) {
      this.isLoading = true;
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
          this.isLoading = false;
          alert("Gallery Image Added Successfully");
          this.closeModal(); // Close the modal after successful submission
        },
        error => {
          console.error('HTTP Error:', error);
          alert("Gallery Image Added Failed");
          this.isLoading = false;
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
      const fileType = file.type;

      if (!fileType.startsWith('image/')) {
        this.fileError = 'Only image files are allowed';
        this.galleryForm.patchValue({
          galleryImage: null
        });
      } else {
        this.fileError = '';
        this.galleryForm.patchValue({
          galleryImage: file
        });
      }
    }
  }

  deleteGalleryImage(id: string) {
    this.isLoading = true;
    this.galleryFacadeService.deleteGalleryImage(id).subscribe(
      response => {
        console.log('Image deleted successfully');
        this.loadGalleryImages();
        this.isLoading = false;
        alert("Gallery Image Deleted Successfully");
      },
      error => {
        console.error('Error deleting image:', error);
        alert("Gallery Image Deleted Failed");
        this.isLoading = false;
      }
    );
  }

  closeModal() {
    // const modalElement = this.staticBackdrop.nativeElement;
    // const modalInstance = new bootstrap.Modal(modalElement);
    // modalInstance.hide();
  }
}