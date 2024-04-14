import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private allProductsUrl: string = 'http://localhost:3000/api/product/products';

  private productDetailsUrl: string =
    'http://localhost:3000/api/product/products';

  private addToCartUrl: string = 'http://localhost:3000/api/product/add';

  private getCartUrl: string = 'http://localhost:3000/api/product';

  private updateQuantityUrl: string =
    'http://localhost:3000/api/product/updateQuantity';

  private deleteProductUrl: string =
    'http://localhost:3000/api/product/removeproduct';

  private checkoutUrl: string = 'http://localhost:3000/api/stripe/checkout';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.allProductsUrl);
  }

  getProductDetails(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productDetailsUrl}/${id}`);
  }

  addToCart(
    username: string,
    productId: number,
    quantity: number
  ): Observable<any> {
    const body = { username, productId, quantity };
    return this.http.post<any>(this.addToCartUrl, body);
  }

  getCart(username: string): Observable<any> {
    return this.http.get<any>(`${this.getCartUrl}/${username}`);
  }

  updateQuantity(
    username: string,
    productId: number,
    quantity: number
  ): Observable<any> {
    const body = { username, productId, quantity };
    return this.http.put<any>(this.updateQuantityUrl, body);
  }

  removeProductFromCart(username: string, productId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteProductUrl}/${username}/${productId}`
    );
  }

  checkout(
    products: Product[],
    successUrl: string,
    cancelUrl: string
  ): Observable<any> {
    return this.http.post<any>(this.checkoutUrl, {
      products,
      successUrl,
      cancelUrl,
    });
  }
}
