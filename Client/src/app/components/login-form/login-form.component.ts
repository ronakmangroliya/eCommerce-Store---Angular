import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { CustomToastComponent } from '../custom-toast/custom-toast.component';
interface ApiResponse {
  status: string;
  data: any;
  message: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CustomToastComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  
  // open render deployment URL for backend
  private baseURL: string = 'https://angular-ecommerce-app.onrender.com';

  loginData = {
    username: '',
    password: '',
  };
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.http
        .post<ApiResponse>(this.baseURL + '/api/auth/login', this.loginData)
        .subscribe(
          (response) => {
            //  console.log(response);
            if (response.status === 'success') {
              // Store the username in the AuthService
              const username = response.data.username;
              this.authService.setUsername(username);
              this.toastService.showToast('Login successful');
              // Redirect to home page or any other route upon successful login
              this.router.navigateByUrl('/shopping-list');
            } else {
              // Handle login failure
              this.errorMessage = response.message || 'Failed to login';
            }
          },
          (error) => {
            console.error('Error logging in:', error); // Log error for debugging
            this.toastService.showToast(
              error.error.message || 'Failed to login'
            );
          }
        );
    } else {
      // Form is invalid
      this.toastService.showToast('Please enter valid credentials');
    }
  }
}
