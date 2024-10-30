import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryFacadeService } from '../../../../facade/gallery.facade.service';
import * as bootstrap from 'bootstrap';
import { ToastService } from '../../../../service/toast.service';

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
  @ViewChild('closeModalButton', { static: false }) closeModalButton!: ElementRef<HTMLButtonElement>;


  gallery: any;
  galleryForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  fileError: string = '';
  categoriesdropdown: any[] = [
    {id: 1, name: "Training"},
    {id: 2, name: "Events"},
    {id: 3, name: "Competition"},
    {id: 4, name: "Achievements"},
  ];
  constructor(
    private galleryFacadeService: GalleryFacadeService,
    private titleService: Title,
    private metaService: Meta,
    public toastService: ToastService,

  ) {
    this.galleryForm = new FormGroup({
      galleryImage: new FormControl(null, [Validators.required]),
      galleryTitle: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      galleryDescription: new FormControl(""),
     // galleryDescription: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      galleryCategory: new FormControl("", [Validators.required]),
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
      this.toastService.show('Gallery Images Loaded Successfully', { classname: 'bg-success text-light', delay: 1000 });
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.galleryForm.value);
    if (this.galleryForm.valid && !this.fileError) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('galleryImage', this.galleryForm.get('galleryImage')?.value);
      formData.append('galleryTitle', this.galleryForm.get('galleryTitle')?.value);
      formData.append('galleryDescription', this.galleryForm.get('galleryDescription')?.value);
      formData.append('galleryCategory', this.galleryForm.get('galleryCategory')?.value);

      this.galleryFacadeService.createGalleryImages(formData).subscribe(
        response => {
          console.log(response);
          this.loadGalleryImages(); // Reload gallery images after successful upload
          this.galleryForm.reset();
          this.submitted = false;
          this.resetFileInput();
          this.isLoading = false;
          this.toastService.show('Gallery Image Added Successfully', { classname: 'bg-success text-light', delay: 5000 });
          this.closeModalButton.nativeElement.click();
        },
        error => {
          console.error('HTTP Error:', error);
          this.toastService.show('Gallery Image Added Failed', { classname: 'bg-danger text-light', delay: 5000 });
          this.isLoading = false;
        }
      );
    }
    else{
      this.toastService.show('Please fill all the fields', { classname: 'bg-danger text-light', delay: 5000 });
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

 
}