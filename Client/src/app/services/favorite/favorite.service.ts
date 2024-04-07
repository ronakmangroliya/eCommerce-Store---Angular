import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private toggleUrl: string = 'http://localhost:3000/api/favorite/toggle';

  private checkFavoritesUrl: string = 'http://localhost:3000/api/favorite';

  private getFavoritesUrl: string = 'http://localhost:3000/api/favorite/allProducts';

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
