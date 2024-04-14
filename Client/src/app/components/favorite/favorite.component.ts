import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth/auth.service';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { Product } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { CustomToastComponent } from '../custom-toast/custom-toast.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CustomToastComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent implements OnInit {
  favoriteProducts: Product[] = [];
  username: string = '';

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getFavoriteProducts();
  }

  getFavoriteProducts(): void {
    const username = this.authService.getUsername() || '';
    if (!username) {
      // console.error('Username not found');
      this.toastService.showToast('Username not found');
      return;
    }
    this.favoriteService.getUserFavorites(username).subscribe(
      (data: any) => {
        this.favoriteProducts = data.data || [];
      },
      (error) => {
        // console.error('Failed to fetch favorite products:', error);
        this.toastService.showToast('Failed to fetch favorite products');
      }
    );
  }
}
