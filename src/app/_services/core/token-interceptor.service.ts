import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private jwtService: JwtService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      Accept: 'application/json',
      Authorization: '',
    };
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    const updatedReq = req.clone({ setHeaders: headersConfig });
    return next.handle(updatedReq);
  }
}
