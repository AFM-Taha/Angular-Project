import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/_models/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  showNotification(response: ApiResponse): void {
    if (response.status) {
      response.status
        ? this.showSuccess(response.message)
        : this.showError(response.message);
    } else {
      this.showSystemError(response);
    }
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Success', {
      duration: 3000,
    });
  }

  showSystemError(err: any): void {
    let msg = err.status + ' - ' + err.statusText;
    let logout = false;
    let redirect = false;
    let url = '';
    switch (err.status) {
      case 409:
      case 400:
        msg = err.error.message ? err.error.message : msg;
        break;
      case 403:
        msg = 'You are NOT Permitted to Perform this action';
        redirect = true;
        url = 'dashboard';
        break;
      case 404:
        msg = 'Requested URL NOT FOUND';
        break;
      case 401:
        logout = true;
        break;
    }
    this.snackBar.open(msg, 'Error', {
      duration: 3000,
    });
    if (logout) {
      this.authService.logout().subscribe((resData) => {
        if (resData) {
          this.router.navigate(['login']);
        }
      });
    }
    if (redirect) {
      this.router.navigate([url]);
    }
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Error', {
      duration: 3000,
    });
  }
}
