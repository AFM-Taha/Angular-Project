import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const token = this.jwtService.getToken();
    if (token) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  canDeactivate() {
    const token = this.jwtService.getToken();
    if (!token) {
        return true;
    } else {
        this.router.navigate(['dashboard']);
        return false;
    }
}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const code = route.data.pageCode;
    if (code !== undefined) {
      // if (!this.jwtService.getPageAccess(code)) {
      //   this.logout();
      // }
      return this.canActivate();
    } else {
      this.logout();
    }
    return false;
  }

  logout(): void {
    this.authService.logout().subscribe((resData) => {
      if (resData) {
        this.router.navigate(['login']);
      }
    });
  }
}
