import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  setToken(token: string): void {
    window.localStorage.setItem('admin_jwt_token', token);
  }

  getToken(): string | null {
    return window.localStorage.getItem('admin_jwt_token');
  }
  destroyToken(): void {
    window.localStorage.removeItem('admin_jwt_token');
  }
}
