import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StakingService } from 'src/app/_services/staking.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { Router,ActivatedRoute  } from '@angular/router';
import { CurrencyService } from 'src/app/_services/currency.service';

@Component({
  selector: 'app-staking-form',
  templateUrl: './staking-form.component.html',
  styleUrls: ['./staking-form.component.scss']
})
export class StakingFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  isLoading1 = false;
  _id: any;
  currency = [];
  currentData: any = {};
  level: any = [ {package: '1'} ]
  params: any = [ { key: 'packageName', title: 'Package Name' }, { key: 'from', title: 'From Value' }, { key: 'to', title: 'To Value' }, { key: 'interest', title: 'Interest' }, { key: 'interestUnlockDays', title: 'Interest Unlock Days' }, { key: 'tenureDays', title: 'Tenure Days' }]
  constructor(
    private fb: FormBuilder,
    private stakingService: StakingService,
    private currencyService: CurrencyService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currencyService
    .getCurrencyTblDetails()
    .subscribe(
      (result) => {
        //this.currency = result.getCurrencyTblDetails;
        let curList = JSON.parse(JSON.stringify(result.getCurrencyTblDetails));
        let checkObj = {};
        curList.forEach(element => {
          if(typeof checkObj[element.currencyId] != 'string') {
            checkObj[element.currencyId] = 'inserted';
            this.currency.push(element);
          }
        });
      },
      (err) => {
        this.notify.showSystemError(err);
      }
    );
    this._id = this.route.snapshot.params._id;
    if(this._id != 1){
      this.stakingService.getStakingById({_id:this._id}).subscribe((data: any) => {
        if(data.status) {
          this.currentData = data.message;
          if(Object.keys(this.currentData.packages).length > 0) {
            this.level = [];
            for(let inc = 0; inc < Object.keys(this.currentData.packages).length; inc++) {
              this.level.push({package: '1'});
            }
          }
          this.initForm();
        } else {
          this.notify.showSuccess(data.message);
          this.router.navigate(['dashboard','staking-list']);
        }
      });
    } else {
      this.initForm();
    }
  }
  initForm() {
    let formFields = {
      currencyId: ['', Validators.required],
      maturityDays: ['', Validators.required],
      status: ['', Validators.required]
    };
    this.level.forEach((element, key) => {
      this.params.forEach(element1 => {
        formFields[key+element1.key] = ['', Validators.required];
      });
    });
    this.form = this.fb.group(formFields);
    if(this._id != 1){
      let formData = JSON.parse(JSON.stringify(this.currentData));
      if(typeof formData.packages == 'object') {
        this.level.forEach((element, key) => {
          if(typeof formData.packages[key] == 'object') {
            this.params.forEach(element1 => {
              formData[key+element1.key] = formData.packages[key][element1.key];
            });
          }
        });
      }
      delete formData.packages;
      delete formData.dateTime;
      delete formData.__v;
      delete formData._id;
      this.form.patchValue(formData);
    }
    this.isLoading1 = true;
  }
  addPackage() {
    this.level.push({package: '1'});
    this.initForm();
  }
  removePackage(key: number) {
    this.level.splice(key, 1); 
    this.initForm();
  }
  compareItems(i1, i2) {
    return i1==i2;
  }

  formSubmitHandler(): void {
      let formData = this.form.value;
      formData.packages = {};
      this.level.forEach((element, key) => {
        formData.packages[key] = {};
        this.params.forEach(element1 => {
          formData.packages[key][element1.key] = formData[key+element1.key];
          delete formData[key+element1.key];
        });
      });
      if(this._id != 1){
        formData._id = this._id;
        this.stakingService.updateStaking(formData).subscribe((data: any) => {
          this.isLoading = false;
          if (data.status === true) {
            this.notify.showSuccess(data.message);
            this.router.navigate(['dashboard','staking-list']);
          } else {
            this.notify.showError(data.message);
          }
        }, (err) => {
          this.isLoading = false;
          this.notify.showSystemError(err);
        });  
      }else {
        this.stakingService.addStaking(formData).subscribe((data: any) => {
          this.isLoading = false;
          if (data.status === true) {
            this.notify.showSuccess(data.message);
            this.router.navigate(['dashboard','staking-list']);
          } else {
            this.notify.showError(data.message);
          }
        }, (err) => {
          this.isLoading = false;
          this.notify.showSystemError(err);
        }); 
      } 
    }
  closeDialog(): void {
    this.router.navigate(['dashboard','staking-list']);
  }
}
