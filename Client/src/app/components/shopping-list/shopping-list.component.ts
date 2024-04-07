import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Product,
  ProductService,
} from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth/auth.service';
import { FavoriteService } from '../../services/favorite/favorite.service';


@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  products: Product[] = [];
  errorMessage: string = '';

  selectedCategory: string = '';
  searchTerm: string = '';

  productId: number = 0;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data.data.map((product: Product) => ({
          ...product,
          isFavorite: false,
        }));
        // this.filteredProducts = [...this.products];
        this.checkFavorites();
      },
      (error) => {
        this.errorMessage = error.message || 'Failed to fetch products';
      }
    );
  }

  checkFavorites(): void {
    const username = this.authService.getUsername() || '';
    if (!username) return;

    this.favoriteService.checkFavorites(username).subscribe(
      (data: any) => {
        const favoriteProducts = data.data || [];
        this.products.forEach((product) => {
          product.isFavorite = favoriteProducts.includes(product.id);
        });
      },
      (error) => {
        console.error('Failed to fetch user favorites:', error);
      }
    );
  }

  addToCart(productId: number, quantity: number): void {
    const username = this.authService.getUsername() || '';
    if (!username || !productId || !quantity) {
      console.log('Username, productId, and quantity are required');
      return;
    }

    this.productService.addToCart(username, productId, quantity).subscribe(
      (data: any) => {
        alert('Product added to cart successfully');
      },
      (error) => {
        console.error('Failed to add product to cart:', error);
      }
    );
  }

  toggleFavorite(productId: number): void {
    const username = this.authService.getUsername() || '';
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      console.error('Product not found');
      return;
    }
    product.isFavorite = !product.isFavorite;
    this.favoriteService.toggleFavorite(username, productId).subscribe(
      (data: any) => {
        // console.log(data.message);
        alert(data.message);
      },
      (error) => {
        console.error('Error toggling favorite status:', error);
      }
    );
  }

  filterProducts(): Product[] {
    let filteredProducts = [...this.products];

    if (this.searchTerm.trim() !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCategory.trim() !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === this.selectedCategory
      );
    }

    return filteredProducts;
  }
}
