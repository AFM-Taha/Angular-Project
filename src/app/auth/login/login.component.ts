import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtService } from 'src/app/_services/core/jwt.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { NotificationService } from 'src/app/_services/core/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  assetUrl = environment.assetUrl;
  form!: FormGroup;
  isLoading = false;
  year = new Date().getFullYear();
  otpShow=false;
  password: string = 'password';
  siteSettings: any = {};
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private notify: NotificationService,
    private router: Router,
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getToken();
    const userCheck = userId != null && userId != '' ? true : false;
    if(userCheck) {
      this.router.navigate(['dashboard']);
    }
    this.inItForm();
    this.settingsService.getSiteSettings().subscribe((res: any) => {
      this.siteSettings = res.message;
    });
  }
  togglePassword(){
    if(this.password=='password') {
      this.password='text';
    } else {
      this.password='password';
    }
  }
  inItForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      otp: [''],
    });
  }

  formSubmitHandler(): void {
    this.authService.login(this.form.value).subscribe(
      (res) => {
        if (res.status === true) {
          if(typeof res.token != undefined &&  typeof res.token != 'undefined') {
            this.jwtService.setToken(res.token);
            window.localStorage.setItem('admin_role', res.adminDetails.role);
            if(res.adminDetails.role == 0) {
              window.localStorage.setItem('admin_page_access', JSON.stringify(res.adminDetails.roles));
            }
            this.notify.showSuccess(res.message);
            this.router.navigate(['dashboard']);
          }
          this.otpShow = true;
        } else {
          this.notify.showError(res.message);
        }
      },
      (err) => {
        this.notify.showSystemError(err);
      }
    );
  }

}