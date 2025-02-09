import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fighter-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './fighter-login.component.html',
  styleUrl: './fighter-login.component.css'
})
export class FighterLoginComponent {
  loginForm!:FormGroup

  onSubmit(){
    
  }
}
