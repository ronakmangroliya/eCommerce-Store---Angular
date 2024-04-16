import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { CustomToastComponent } from '../custom-toast/custom-toast.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    CustomToastComponent,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent implements OnInit {
  // open render deployment URL for backend
  private baseURL: string = 'https://angular-ecommerce-app.onrender.com';

  myForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.http
      .post<any>(this.baseURL + '/api/auth/signup', this.myForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status === 'success') {
            this.toastService.showToast(
              'Sign up successful' || response.message
            );
            this.router.navigateByUrl('/');
          } else {
            this.toastService.showToast(
              response.message || 'Failed to sign up'
            );
          }
        },
        (error) => {
          this.toastService.showToast(
            error.error.message || 'Failed to sign up'
          );
        }
      );
  }
}
