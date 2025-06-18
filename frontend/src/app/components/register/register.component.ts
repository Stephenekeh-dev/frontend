import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  username= '';
  password = '';
  age: number | null = null;
  profileImage?: File;

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.profileImage = event.target.files[0];
    }
  }

  register() {
    if (!this.firstName || !this.lastName || !this.username|| !this.password || !this.age) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      age: this.age,
      profileImage: this.profileImage
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Try again.';
        this.successMessage = '';
      }
    });
  }
}
