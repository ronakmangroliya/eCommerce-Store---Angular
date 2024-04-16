import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  
  // open render deployment URL for backend
  private baseURL: string = 'https://angular-ecommerce-app.onrender.com';

  private toggleUrl: string = this.baseURL + '/api/favorite/toggle';

  private checkFavoritesUrl: string = this.baseURL + '/api/favorite';

  private getFavoritesUrl: string = this.baseURL + '/api/favorite/allProducts';

  constructor(private http: HttpClient) {}

  toggleFavorite(username: string, productId: number): Observable<any> {
    return this.http.post<any>(`${this.toggleUrl}`, { username, productId });
  }

  checkFavorites(username: string): Observable<any> {
    const urlCheckFavorites = `${this.checkFavoritesUrl}/${username}`;
    return this.http.get<any>(urlCheckFavorites);
  }

  getUserFavorites(username: string): Observable<any> {
    const urlAllFavorites = `${this.getFavoritesUrl}/${username}`;
    return this.http.get<any>(urlAllFavorites);
  }
}
