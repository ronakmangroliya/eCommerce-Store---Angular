import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent implements OnInit {
  myForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.http.post<any>('http://localhost:3000/api/auth/signup', this.myForm.value)
      .subscribe(
        response => {
          console.log(response);
          if (response.status === 'success') {
            alert('Sign up successful');
            this.router.navigateByUrl('/');
          } else {
            this.errorMessage = response.message || 'Failed to sign up';
          }
        },
        error => {
          console.error('Error signing up:', error);
          this.errorMessage = error.error.message || 'Failed to sign up';
        }
      );
  }
}