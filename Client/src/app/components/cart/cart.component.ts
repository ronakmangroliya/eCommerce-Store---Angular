import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartData: any;
  errorMessage: string = '';

  successUrl: string = 'http://localhost:4200/success';
  cancelUrl: string = 'http://localhost:4200/success';

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getUsername();
    if (username) {
      this.productService.getCart(username).subscribe(
        (data: any) => {
          this.cartData = data.data || [];
          this.cartData.forEach((product: any) => {
            product.quantity = product.quantity || 1;
          });
        },
        (error) => {
          this.errorMessage = error.message || 'Failed to fetch cart data';
        }
      );
    }
  }

  incrementQuantity(product: any) {
    const username = this.authService.getUsername() || '';
    product.quantity++;
    this.updateProductQuantity(username, product);
  }

  decrementQuantity(product: any) {
    const username = this.authService.getUsername() || '';
    if (product.quantity > 1) {
      product.quantity--;
      this.updateProductQuantity(username, product);
    }
  }

  private updateProductQuantity(username: string, product: any) {
    this.productService
      .updateQuantity(username, product.product.id, product.quantity)
      .subscribe(
        (response) => {
          console.log('Quantity updated successfully');
        },
        (error) => {
          console.error('Failed to update quantity:', error);
        }
      );
  }

  removeFromCart(product: any) {
    const username = this.authService.getUsername() || '';
    const productId = product.product.id;
    this.productService.removeProductFromCart(username, productId).subscribe(
      (response) => {
        console.log('Product removed successfully');
        this.refreshCartData();
      },
      (error) => {
        console.error('Failed to remove product:', error);
      }
    );
  }

  private refreshCartData() {
    const username = this.authService.getUsername() || '';
    this.productService.getCart(username).subscribe(
      (data: any) => {
        this.cartData = data.data || [];
        this.cartData.forEach((product: any) => {
          product.quantity = product.quantity || 1;
        });
      },
      (error) => {
        this.errorMessage = error.message || 'Failed to fetch cart data';
      }
    );
  }

  calculateSubtotal(): number {
    let subtotal = 0;
    for (const product of this.cartData) {
      if (product.product && product.product.price) {
        subtotal += product.product.price * product.quantity;
      }
    }
    return Number(subtotal.toFixed(2));
  }

  calculateTax(): number {
    const taxRate = 0.13;
    const tax = this.calculateSubtotal() * taxRate;
    return Number(tax.toFixed(2));
  }

  calculateTotal(subtotal: number): number {
    const shippingCost = 4.99;
    const handlingFee = 2.99;

    const total = subtotal + this.calculateTax() + shippingCost + handlingFee;
    return Number(total.toFixed(2));
  }

  goToCheckout(): void {
    // console.log(this.cartData);

    this.productService
      .checkout(this.cartData, this.successUrl, this.cancelUrl)
      .subscribe(
        (response) => {
          window.location.href = response.sessionURL;
        },
        (error) => {
          console.error('Failed to initiate checkout:', error);
          // Handle error if needed
        }
      );
  }
}
