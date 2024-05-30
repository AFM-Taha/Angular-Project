import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/_services/settings.service';
import { NotificationService } from 'src/app/_services/core/notification.service';

@Component({
  selector: 'app-my-profile-form',
  templateUrl: './my-profile-form.component.html',
  styleUrls: ['./my-profile-form.component.scss']
})
export class MyProfileFormComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;
  isLoading = false;
  profile: File;
  data: any = {};

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.form1 = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
    this.settingsService.getMyProfile().subscribe((res: any) => {
      this.data = res.getProfileDetails;
      this.form.patchValue({
        name: this.data.name,
        profile: this.data.profile,
      });
    });
  }
  formSubmitHandler1(): void {   
    if(this.form1.value.newPassword==this.form1.value.confirmNewPassword){
      if(this.form1.value.newPassword==this.form1.value.oldPassword){
        this.notify.showError("Old Password and New Password Identical");
      }else{
        this.settingsService.changePassword(this.form1.value).subscribe((data: any) => {
          if (data.status === true) {
            this.notify.showSuccess(data.message);
            this.form1.patchValue({
              oldPassword : '',
              newPassword : '',
              confirmNewPassword : ''
            });
          } else {
            this.notify.showError(data.message);
          }
        }, (err) => {
          this.notify.showError(err);
        });   
      }
    }
    else{
        this.notify.showError("New Password and Confirm New Password doesn't Match");
    }
  }
  formSubmitHandler(): void {
      const formData = new FormData();
      let sizeFile:any = 0;
      if(this.profile){
          let fileToUpload: any = this.profile;
          let fileName:string = 'profile'//get name from form for example
          let fileExtension:string = fileToUpload.name.split('?')[0].split('.').pop();
          formData.append('images[]', fileToUpload, fileName+'.'+fileExtension);
          sizeFile++;
      }
      this.isLoading = true;
      if(sizeFile > 0) {
        this.settingsService.UploadImage(formData,sizeFile,'profile').subscribe((data: any) => {
          if (data.status === true) {
            this.form.value.profile = data.message[0].location
            this.updateMyProfile();
          } else {
            this.notify.showError(data.message);
          }
        }, (err) => {
          this.notify.showSystemError(err);
        });
      } else {
        this.updateMyProfile();
      }
    }
    updateMyProfile(){
    let formData = this.form.value;
    formData._id = this.data._id;
    this.settingsService.updateMyProfile(formData).subscribe((data: any) => {
      if (data.status === true) {
        this.notify.showSuccess(data.message);
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.notify.showSystemError(err);
    });   
  }

  onlogoURIChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profile = file;
    }
  }
}
