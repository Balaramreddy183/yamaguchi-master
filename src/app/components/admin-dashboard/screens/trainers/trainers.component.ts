import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrainerService } from '../../../../service/trainer.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../service/toast.service';

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
export class TrainersComponent implements OnInit {

  trainers: any[] = [];
  isLoading: boolean = false;
  trainersForm: FormGroup;
  fileError: string = '';

  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.trainersForm = new FormGroup({
      trainerImage: new FormControl(null, [Validators.required]),
      trainerName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      trainerQualification: new FormControl('', [Validators.required, Validators.minLength(3)]),
      trainerExperience: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    });
  }

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers() {
    this.isLoading = true;
    this.trainerService.getAllTrainerDetails().subscribe(
      (response: any) => {
        this.trainers = response;
        this.isLoading = false;
        console.log("All Trainers ", this.trainers);
      },
      (error) => {
        console.error('Error loading trainers:', error);
        this.isLoading = false;
        this.toastService.show('Failed to load trainers. Please try again.', { classname: 'bg-danger text-light', delay: 5000 });
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileType = file.type;

      if (!fileType.startsWith('image/')) {
        this.fileError = 'Only image files are allowed';
        this.trainersForm.patchValue({
          trainerImage: null
        });
      } else {
        this.fileError = '';
        this.trainersForm.patchValue({
          trainerImage: file
        });
      }
    }
  }

  addTrainer() {
    if (this.trainersForm.valid && !this.fileError) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('trainerImage', this.trainersForm.get('trainerImage')?.value);
      formData.append('trainerName', this.trainersForm.get('trainerName')?.value);
      formData.append('trainerQualification', this.trainersForm.get('trainerQualification')?.value);
      formData.append('trainerExperience', this.trainersForm.get('trainerExperience')?.value);
      console.log("Form Data", formData);
      this.trainerService.createTrainerDetails(formData).subscribe(
        (response: any) => {
          console.log("Trainer Added Response", response);
          this.trainers.push(response);
          this.trainersForm.reset();
          this.isLoading = false;
          this.toastService.show('Trainer added successfully!', { classname: 'bg-success text-light', delay: 5000 });
        },
        (error) => {
          console.error('Error adding trainer:', error);
          this.isLoading = false;
          this.toastService.show('Failed to add trainer. Please try again.', { classname: 'bg-danger text-light', delay: 5000 });
        }
      );
    } else {
      this.toastService.show('Please fill all the fields', { classname: 'bg-danger text-light', delay: 5000 });
    }
  }

  deleteTrainer(_id: string) {
    if (confirm('Are you sure you want to delete this trainer?')) {
      this.isLoading = true;
      this.trainerService.deleteTrainerDetails(_id).subscribe(
        () => {
          this.trainers = this.trainers.filter(trainer => trainer._id !== _id);
          this.isLoading = false;
          this.toastService.show('Trainer deleted successfully!', { classname: 'bg-success text-light', delay: 5000 });
        },
        (error) => {
          console.error('Error deleting trainer:', error);
          this.isLoading = false;
          this.toastService.show('Failed to delete trainer. Please try again.', { classname: 'bg-danger text-light', delay: 5000 });
        }
      );
    }
  }
}
