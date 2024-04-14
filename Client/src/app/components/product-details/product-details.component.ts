import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { CustomToastComponent } from '../custom-toast/custom-toast.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CustomToastComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  @Input() selectedProduct: Product;
  @Output() closePopup = new EventEmitter<void>();
  @Output() addToCartClicked = new EventEmitter<{
    productId: number;
    quantity: number;
  }>();

  productId: number = 0;
  quantity: number = 1;

  constructor(private toastService: ToastService) {
    this.selectedProduct = {} as Product;
  }

  ngOnInit(): void {}

  onClose(): void {
    this.closePopup.emit();
  }

  onAddToCart(productId: number, quantity: number): void {
    this.addToCartClicked.emit({ productId, quantity }); 
    this.toastService.showToast('Product added to cart successfully');
  }
}
