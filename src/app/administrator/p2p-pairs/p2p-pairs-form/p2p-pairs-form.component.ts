import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyService } from 'src/app/_services/currency.service';
import { P2PService } from 'src/app/_services/p2p.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-p2p-pairs-form',
  templateUrl: './p2p-pairs-form.component.html',
  styleUrls: ['./p2p-pairs-form.component.scss']
})
export class P2PPairsFormComponent implements OnInit {
  form: FormGroup;
  currency: any;
  currency1: any;
  isLoading = false;
  icon: File;
  siteSettings: any;


  constructor(
    private dialogRef: MatDialogRef<P2PPairsFormComponent>,
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private P2PService: P2PService,
    private notify: NotificationService,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      minTrade: ['', Validators.required],
      maxTrade: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.currency = this.data.currency;
    this.currency1 = this.data.currency;
    this.data = this.data.editData;
    if(this.data != ''){
      this.form.patchValue(this.data);
    }
  }

  setToCurrency(value: string) {
    const index = this.currency.findIndex(data => {
      return value == data._id
    });
    this.currency1 = JSON.parse(JSON.stringify(this.currency));
    this.currency1.splice(index, 1)
  }

  compareItems(i1, i2) {
    return i1==i2;
  }

  formSubmitHandler(): void {
    if(this.data!='') {
      let formData =this.form.value;
      formData._id = this.data._id;
      this.P2PService.updatePairs(formData).subscribe((data: any) => {
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
      this.P2PService.addPairs(dataForm).subscribe((data: any) => {
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
  checkImage(url) {
    var image = new Image();
    image.onload = function(event: any) {
      return true;
    }
    image.onerror = function() {
      return false;
    }
    image.src = url;
  }  
  closeDialog(): void {
    this.dialogRef.close({ event : 'close', data:{status: false}});
  }

  onlogoURIChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.icon = file;
    }
  }
}
