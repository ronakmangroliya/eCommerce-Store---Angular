import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly USERNAME_KEY = 'username';

  constructor() {}

  setUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
}
