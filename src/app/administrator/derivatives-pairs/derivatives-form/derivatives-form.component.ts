import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyService } from 'src/app/_services/currency.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-derivatives-form',
  templateUrl: './derivatives-form.component.html',
  styleUrls: ['./derivatives-form.component.scss']
})
export class DerivativesPairsFormComponent implements OnInit {
  form: FormGroup;
  currency: any;
  currency1: any;
  toCurrency: any;
  isLoading = false;
  icon: File;
  siteSettings: any;


  constructor(
    private dialogRef: MatDialogRef<DerivativesPairsFormComponent>,
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private notify: NotificationService,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      marketPrice: ['', Validators.required],
      minTrade: ['', Validators.required],
      makerFee: ['', Validators.required],
      takerFee: ['', Validators.required],
      makerFeeWithKYC: ['', Validators.required],
      takerFeeWithKYC: ['', Validators.required],
      status: ['1', Validators.required],
      autoOrderExecute: ['1', Validators.required],
      
      autoTradeOrder: ['1', Validators.required],

      marketStatus: ['1', Validators.required],
      changePercentage: ['0', Validators.required],
      enableBuySell: ['1', Validators.required],
      enableTradeHistory: ['1', Validators.required],
      enableVolumeStatus: ['1', Validators.required],
      orderDataMin: ['0.01', Validators.required],
      orderDataMax: ['0.03', Validators.required],
    });
    this.currency = this.data.currency;
    if (this.data.currency.length > 0) {
      let currencyList = [];
      var result = this.currency.find(item => item.currencySymbol === 'USDT');
      currencyList.push(result);
      this.currency1 = currencyList;
    }
    this.data = this.data.editData;
    if(this.data != ''){
      this.form.patchValue(this.data);
    }
  }

  setToCurrency(value: string) {
    console.log('currency',this.currency)
    const index = this.currency.findIndex(data => {
      return value == data._id
    });
    this.currency1 = JSON.parse(JSON.stringify(this.currency));
    this.currency1.splice(index, 1)
    if (this.currency.length > 0) {
      let currencyList = [];
      var result = this.currency.find(item => item.currencySymbol === 'USDT');
      currencyList.push(result);
      this.currency1 = currencyList;
    }
  }
  changeStatus(type: string) {
    this.data.autoOrderExecute = type;
  }
  compareItems(i1, i2) {
    return i1==i2;
  }

  formSubmitHandler(): void {
    if(this.data!='') {
      let formData =this.form.value;
      formData._id = this.data._id;
      this.currencyService.updateDerivativesPairs(formData).subscribe((data: any) => {
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
      this.currencyService.addDerivativesPairs(dataForm).subscribe((data: any) => {
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
