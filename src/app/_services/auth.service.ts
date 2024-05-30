import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Auth, AuthResponse, resetPassword } from '../_models/auth';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../_models/core';
import { JwtService } from './core/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  getToken() {
    return this.jwtService.getToken();
  }

  login(body: Auth): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${environment.apiUrl}admin/login`,
      body
    );
  }

  forgotpassword(body: { email: string }): Observable<{ status: boolean }> {
    return this.httpClient.post<{ status: boolean }>(
      `${environment.apiUrl}admin/forgotPassword`,
      body
    );
  }

  forgotpasswordCheck(body: { resetPasswordCode: string }): Observable<{ status: boolean }> {
    return this.httpClient.post<{ status: boolean }>(
      `${environment.apiUrl}admin/forgotPasswordCheck`,
      body
    );
  }

  resetPassword(body: resetPassword): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/resetPassword`,
      body
    );
  }

  logout(): Observable<boolean> {
    this.jwtService.destroyToken();
    return of(true);
  }

  getUserPages(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      `${environment.apiUrl}admin/userPages/`
    );
  }
}
