import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-custom-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.css',
})
export class CustomToastComponent implements OnInit {
  message: string = '';

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState.subscribe((message) => {
      this.message = message;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    });
  }

  closeToast() {
    if (this.message) {
      this.message = '';
    }
  }
}
