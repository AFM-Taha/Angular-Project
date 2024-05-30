import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyService } from 'src/app/_services/currency.service';
import { CMSService } from 'src/app/_services/cms.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-cms-form',
  templateUrl: './cms-form.component.html',
  styleUrls: ['./cms-form.component.scss']
})
export class CMSFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  icon: File;
  siteSettings: any;


  constructor(
    private dialogRef: MatDialogRef<CMSFormComponent>,
    private fb: FormBuilder,
    private CMSService: CMSService,
    private notify: NotificationService,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      image: ['', false],
      title: [''],
      description: [''],
      status: ['', false],
    });
    this.data = this.data.editData;
    if(this.data != ''){
      this.form.patchValue(this.data);
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event : 'close', data:{status: false}});
  }
  formSubmitHandler(): void {
    const formData = new FormData();
    let sizeFile:any = 0;
    if(this.icon){
      let fileToUpload: any = this.icon;
      let fileName:string = 'cms'//get name from form for example
      let fileExtension:string = fileToUpload.name.split('?')[0].split('.').pop();
      formData.append('images[]', fileToUpload, fileName+'.'+fileExtension);
      sizeFile++;
  }
  this.isLoading = true;
  if(sizeFile > 0) {
    this.settingsService.UploadImage(formData,sizeFile,'cms').subscribe((data: any) => {
      if (data.status === true) {
        this.form.value.image = data.message[0].location
        this.updateCmsData();
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.isLoading = false;
      this.notify.showSystemError(err);
    });
  } else {
    this.updateCmsData();
  }
  }
  updateCmsData(){
    if(this.data!='') {
      let formData =this.form.value;
      formData._id = this.data._id;
      this.CMSService.updateCms(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.dialogRef.close({ event : 'close', data:{status: true}});
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      });  
    } else {
      let formData = this.form.value;
      console.log("formData:",formData)
      this.CMSService.addCms(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.dialogRef.close({ event : 'close', data:{status: true}});
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      }); 
    }
  }
  onlogoURIChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.icon = file;
    }
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
}
