import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.username|| !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Token attached: login');
        this.authService.saveToken(res.token);
        console.log('Token saved:', this.authService.getToken());
        this.successMessage = 'Login successful! Redirecting...';
        this.errorMessage = '';
        
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
        

      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid login credentials.';
        this.successMessage = '';
      }
    });
  }
}
