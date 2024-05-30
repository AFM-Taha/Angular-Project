import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  Router, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import { JwtService } from './jwt.service';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()


export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    constructor(
        private jwtService: JwtService,
        private router: Router
      ) {}
    canDeactivate(component: CanComponentDeactivate, 
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) {
        const token = this.jwtService.getToken();
        if (!token) {
            return true;
        } else {
            this.router.navigate(['dashboard']);
            return false;
        }
    }
}