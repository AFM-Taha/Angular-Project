import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { NotificationService } from 'src/app/_services/core/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  assetUrl = environment.assetUrl;
  form!: FormGroup;
  isLoading = false;
  year =  new Date().getFullYear();
  siteSettings: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notify: NotificationService,
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
  
  inItForm = (): void => 
  {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  formSubmitHandler = (): void =>
  {
    this.isLoading = true;
    this.authService.forgotpassword(this.form.value).subscribe(
      (data) => {
        if (data.status === true) {
          this.notify.showSuccess('Reset Password Link send Successfully');
          this.router.navigate(['login']);
        } else {
          this.notify.showError('Invalid Email');
        }
        this.isLoading = false;
      },
      (err) => this.notify.showSystemError(err)
    );
  }

}
