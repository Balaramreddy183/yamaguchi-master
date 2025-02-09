import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fighter-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './fighter-signup.component.html',
  styleUrl: './fighter-signup.component.css'
})
export class FighterSignupComponent {
  signupForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      experience: ['Beginner'],
      timeSlot: ['morning'],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  get f() { return this.signupForm.controls; }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { matching: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    console.log(this.signupForm.value);
    alert('Registration successful!');
  }
}
