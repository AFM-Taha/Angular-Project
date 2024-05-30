import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from 'src/app/_services/currency.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit {
  form: FormGroup;
  addCurrency: any;
  isLoading = false;
  icon: File;
  _id: any;
  level: any = ['level1']
  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private notify: NotificationService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params._id;
    let formFields = {
      currencyName: ['', Validators.required],
      currencySymbol: ['', Validators.required],
      depositEnable: ['', Validators.required],
      transferEnable: ['', Validators.required],
      stakingTransferEnable:['0', Validators.required],
      autoWithdraw: ['', Validators.required],
      USDvalue: ['', Validators.required],
      status: ['', Validators.required],
      basecoin: ['', Validators.required],
      contractAddress: ['', false],
      decimal: ['', Validators.required],
      apiid: ['', Validators.required],
      withdrawEnable: ['', Validators.required],
      curnType: ['', Validators.required],
      siteDecimal: ['', Validators.required],
      image: ['', false],
      tagContent: ['', false],
      depositNotes: ['', Validators.required],
      withdrawNotes: ['', Validators.required],
      currencySymbolCode: ['', false],
      fees : ['', Validators.required],
      feetype : ['', Validators.required],
      mindepamt : ['', Validators.required],
      minwithamt : ['', Validators.required]
    };
    // this.level.forEach(element => {
    //   formFields[element+'fees'] = ['', Validators.required];
    //   formFields[element+'feetype'] = ['', Validators.required];
    //   formFields[element+'minwithamt'] = ['', Validators.required];
    //   formFields[element+'minwithamt'] = ['', Validators.required];
    // });
    this.form = this.fb.group(formFields);
    if(this._id != 1){
      this.currencyService.getCurrencyById({_id:this._id}).subscribe((data: any) => {
        if(data.status) {
          let formData = data.message;
          // if(typeof formData.withdrawLevel == 'object') {
          //   this.level.forEach(element => {
          //     if(typeof formData.withdrawLevel[element] == 'object') {
          //       formData[element+'fees'] = formData.withdrawLevel[element].fees;
          //       formData[element+'feetype'] = formData.withdrawLevel[element].feetype;
          //       formData[element+'minwithamt'] = formData.withdrawLevel[element].minwithamt;
          //     }
          //   });
          // }
          this.form.patchValue(formData);
        } else {
          this.notify.showSuccess(data.message);
          this.router.navigate(['dashboard','currency-list']);
        }
      });
    }
  }

  compareItems(i1, i2) {
    return i1==i2;
  }
  formSubmitHandler(): void {
      const formData = new FormData();
      let sizeFile:any = 0;
      if(this.icon){
          let fileToUpload: any = this.icon;
          let fileName:string = 'currency'//get name from form for example
          let fileExtension:string = fileToUpload.name.split('?')[0].split('.').pop();
          formData.append('images[]', fileToUpload, fileName+'.'+fileExtension);
          sizeFile++;
      }
      this.isLoading = true;
      if(sizeFile > 0) {
        this.settingsService.UploadImage(formData,sizeFile,'currency').subscribe((data: any) => {
          if (data.status === true) {
            this.form.value.image = data.message[0].location
            this.updateCurrencyData();
          } else {
            this.notify.showError(data.message);
          }
        }, (err) => {
          this.isLoading = false;
          this.notify.showSystemError(err);
        });
      } else {
        this.updateCurrencyData();
      }
    }
    updateCurrencyData() {
      let formData = this.form.value;
      console.log(this.form.value,"this.form.value");
      formData.withdrawLevel = {};
      // this.level.forEach(element => {
      //   formData.withdrawLevel[element] = {};
      //   formData.withdrawLevel[element].fees = formData[element+'fees'];
      //   formData.withdrawLevel[element].feetype = formData[element+'feetype'];
      //   formData.withdrawLevel[element].minwithamt = formData[element+'minwithamt'];
      //   delete formData[element+'fees'];
      //   delete formData[element+'feetype'];
      //   delete formData[element+'minwithamt'];
      // });
      if(this._id != 1){
        formData._id = this._id;
        this.currencyService.updateCurrency(formData).subscribe((data: any) => {
          this.isLoading = false;
          if (data.status === true) {
            this.notify.showSuccess(data.message);
            this.router.navigate(['dashboard','currency-list']);
          } else {
            this.notify.showError(data.message);
          }
        }, (err) => {
          this.isLoading = false;
          this.notify.showSystemError(err);
        });  
      }else {
        this.currencyService.addCurrency(formData).subscribe((data: any) => {
          this.isLoading = false;
          if (data.status === true) {
            this.notify.showSuccess(data.message);
            this.router.navigate(['dashboard','currency-list']);
          } else {
            this.notify.showError(data.message);
          }
        }, (err) => {
          this.isLoading = false;
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
    this.router.navigate(['dashboard','currency-list']);
  }

  onlogoURIChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.icon = file;
    }
  }
}
