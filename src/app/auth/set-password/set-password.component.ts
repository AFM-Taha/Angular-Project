import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute  } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { NotificationService } from 'src/app/_services/core/notification.service';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  assetUrl = environment.assetUrl;
  form!: FormGroup;
  isLoading = false;
  year =  new Date().getFullYear();
  id: string
  password: string = 'password';
  siteSettings: any = {};
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.params.id;
    this.authService.forgotpasswordCheck({resetPasswordCode:this.id}).subscribe(
      (data) => {
        if (data.status === false) {
          this.notify.showError('Invalid URL');
         // this.router.navigate(['login']);
        } 
      },
      (err) => this.notify.showSystemError(err)
    );
  
  }
  togglePassword(){
    if(this.password=='password')
    {
      this.password='text';
    }
    else{
      this.password='password';
    }
  }  
  inItForm = (): void => 
  {
    this.form = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  formSubmitHandler = (): void =>
  {
    this.isLoading = true;
    let obj = {newPassword:'',resetPasswordCode:''}
    obj.newPassword=this.form.value.newPassword;
    obj.resetPasswordCode=this.id;
    this.authService.resetPassword(obj).subscribe(
      (data) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.router.navigate(['login']);
        } else {
          this.notify.showError(data.message);
        }
        this.isLoading = false;
      },
      (err) => this.notify.showSystemError(err)
    );
  }

}
