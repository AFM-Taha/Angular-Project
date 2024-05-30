import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyService } from 'src/app/_services/currency.service';
import { FAQService } from 'src/app/_services/faq.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss']
})
export class FAQFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  icon: File;
  siteSettings: any;


  constructor(
    private dialogRef: MatDialogRef<FAQFormComponent>,
    private fb: FormBuilder,
    private FAQService: FAQService,
    private notify: NotificationService,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.data = this.data.editData;
    if(this.data != ''){
      this.form.patchValue(this.data);
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event : 'close', data:{status: false}});
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  formSubmitHandler(): void {
    if(this.data!='') {
      let formData =this.form.value;
      formData._id = this.data._id;
      this.FAQService.updateFaq(formData).subscribe((data: any) => {
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
      let dataForm = this.form.value;
      this.FAQService.addFaq(dataForm).subscribe((data: any) => {
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
}
