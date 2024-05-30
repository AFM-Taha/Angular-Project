import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/_services/settings.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { CurrencyService } from 'src/app/_services/currency.service';

@Component({
  selector: 'app-site-setting-form',
  templateUrl: './site-setting-form.component.html',
  styleUrls: ['./site-setting-form.component.scss']
})
export class SiteSettingFormComponent implements OnInit {

  form: FormGroup;
  siteSettings: any;
  currencyTbl: any = [];
  isLoading = false;
  isLoadingIntial = true;
  files = {};
  level: any = ['level1']
  socialLinks = [ { type: "facebookLink", name: "Facebook" }, { type: "telegramLink", name: "Telegram" }, { type: "twitterLink", name: "Twitter" }, { type: "mediumLink", name: "Medium" }, { type: "instagramLink", name: "Instagram" }, { type: "youtubeLink", name: "Youtube" },{ type: "linkedinLink", name: "LinkedIn" },{ type: "pinterestLink", name: "Pinterest" } ]
  constructor(
    private settingsService: SettingsService,
    private notify: NotificationService,
    private currencyService: CurrencyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.currencyService
    .getCurrencyTblDetails()
    .subscribe(
      (result) => {
        this.currencyTbl = result.getCurrencyTblDetails;
      },
      (err) => {
        this.notify.showSystemError(err);
      }
    );
    this.settingsService.getSiteSettings().subscribe((res: any) => {
      this.siteSettings = res.message;
      this.inItForm();
      this.isLoadingIntial = false;
    });
  }
  compareItems(i1, i2) {
    return i1==i2;
  }

  inItForm(): void {
    let formFields = {
      BuyCryptoFees:['',Validators.required],
      BuyCryptoExtraPriceForBuy:['',Validators.required],
      BuyCryptoExtraPriceForSell:['',Validators.required],
      siteName: ['', Validators.required],
      adminSiteName: ['', Validators.required],
      copyRights: ['', Validators.required],
      supportEmail: ['', Validators.required],
      stakingEmail: ['', false],
      tradeText: [false],
      telegramLink: [false],
      facebookLink: [false],
      twitterLink: [false],
      mediumLink: [false],
      instagramLink: [false],
      youtubeLink: [false],
      linkedinLink: [false],
      pinterestLink: [false],
      linkExpireTiming: ['', Validators.required],
      minDeposit: ['', Validators.required],
      referralCommission: ['', Validators.required],
      referralBonusStatus: ['', Validators.required],
      registerBonusStatus: ['', Validators.required],
      registerBonusDate: ['', Validators.required],
      referralBonus: ['', Validators.required],
      referralBonusCurrency: ['', Validators.required],
      registerBonus: ['', Validators.required],
      maintenanceContent: [false],
      maintenanceFinishTime: ['', Validators.required],
      appmaintenanceContent: [false],
      appmaintenanceFinishTime: [false],
      // stakingreferralBonus: ['', Validators.required],
      // applicationBonuscurr: ['', Validators.required],
      // applicationBonus: ['', Validators.required],
      // applicationBonusEndDate: ['', Validators.required],
      paymentGatewayFees: ['0', false],
      tradeFeeDiscount: ['', Validators.required],
      tradeTDSPercentage: ['', Validators.required],
      tradeUSDTType: ['', Validators.required],
      tradeUSDTValue: ['', Validators.required],
      // preBookingStatus: ['', Validators.required],
      // preBookingTime: ['', Validators.required],
      // preBookingContent: ['', Validators.required],
      // extraBonusDate:['',Validators.required],
      // extraBonus:['',Validators.required],
      userMaxTradeCount:['',Validators.required],
      bonusExpiredPeriod: ['', Validators.required],
    }
    this.level.forEach(element => {
      formFields[element+'MonthlyVolume'] = ['', Validators.required];
      formFields[element+'tradeMaxLimit'] = ['0', false];
      formFields[element+'DailyVolume'] = ['', Validators.required];
      formFields[element+'WalletDailyVolume'] = ['', Validators.required];
      formFields[element+'WalletMonthlyVolume'] = ['', Validators.required];
      formFields[element+'StakingDailyVolume'] = ['0',false];
      formFields[element+'StakingMonthlyVolume'] = ['0',false];
    });
    let formData = this.siteSettings;
    if(typeof formData.preBookingPercentage == 'object' && formData.preBookingPercentage.length > 0) {
      formData.preBookingPercentage.forEach(function(value, index) {
        formFields['from'+index] = ['', Validators.required];
        formFields['to'+index] = ['', Validators.required];
        formFields['bonus'+index] = ['', Validators.required];
      });
    }
    this.form = this.fb.group(formFields);
    this.level.forEach(element => {
      if(typeof formData.withdrawLevel[element] == 'object') {
        formData[element+'DailyVolume'] = formData.withdrawLevel[element].dailyVolume;
        formData[element+'MonthlyVolume'] = formData.withdrawLevel[element].monthlyVolume;
        formData[element+'tradeMaxLimit'] = formData.withdrawLevel[element].tradeMaxLimit;
      }
      if(typeof formData.stakingLevel[element] == 'object') {
        formData[element+'WalletDailyVolume'] = formData.stakingLevel[element].walletDailyVolume;
        formData[element+'WalletMonthlyVolume'] = formData.stakingLevel[element].walletMonthlyVolume;
        formData[element+'StakingDailyVolume'] = formData.stakingLevel[element].stakingDailyVolume;
        formData[element+'StakingMonthlyVolume'] = formData.stakingLevel[element].stakingMonthlyVolume;
      }
    });
    if(typeof formData.preBookingPercentage == 'object' && formData.preBookingPercentage.length > 0) {
      formData.preBookingPercentage.forEach(function(value, index) {
        formData['from'+index] = value.from;
        formData['to'+index] = value.to;
        formData['bonus'+index] = value.bonus;
      })
    }
    this.form.patchValue(formData);
  }

  addPackage() {
    this.siteSettings.preBookingPercentage.push({from: '', to: '', bonus: ''});
    this.inItForm();
  }
  removePackage(key: number) {
    this.siteSettings.preBookingPercentage.splice(key, 1); 
    this.inItForm();
  }

  formSubmitHandler(): void {
    const formData = new FormData();
    let sizeFile:any = 0;
    for (var key in this.files) {
        let fileToUpload: any = this.files[key];
        let fileName:string = key //get name from form for example
        let fileExtension:string = fileToUpload.name.split('?')[0].split('.').pop();
        formData.append('images[]', fileToUpload, fileName+'.'+fileExtension);
        sizeFile++;
    }
    this.isLoading = true;
    if(sizeFile > 0) {
      this.settingsService.UploadImage(formData,sizeFile,'settings').subscribe((data: any) => {
        if (data.status === true) {
          this.updateSiteData();
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      });
    } else {
      this.updateSiteData();
    }
  }
  updateSiteData(){
    let formData = JSON.parse(JSON.stringify(this.form.value));
    formData.withdrawLevel = {};
    formData.stakingLevel = {};
    this.level.forEach(element => {
      formData.withdrawLevel[element] = {};
      formData.withdrawLevel[element].dailyVolume = ((typeof formData[element+'DailyVolume'] == 'number' || typeof formData[element+'DailyVolume'] == 'string') && formData[element+'DailyVolume'] > 0) ? +formData[element+'DailyVolume'] : 0;
      formData.withdrawLevel[element].monthlyVolume = ((typeof formData[element+'MonthlyVolume'] == 'number' || typeof formData[element+'MonthlyVolume'] == 'string') && formData[element+'MonthlyVolume'] > 0) ? +formData[element+'MonthlyVolume'] : 0;
      formData.withdrawLevel[element].tradeMaxLimit = ((typeof formData[element+'tradeMaxLimit'] == 'number' || typeof formData[element+'tradeMaxLimit'] == 'string') && formData[element+'tradeMaxLimit'] > 0) ? +formData[element+'tradeMaxLimit'] : 0;
      delete formData[element+'DailyVolume'];
      delete formData[element+'MonthlyVolume'];
      delete formData[element+'tradeMaxLimit'];
      formData.stakingLevel[element] = {};
      formData.stakingLevel[element].walletDailyVolume = ((typeof formData[element+'WalletDailyVolume'] == 'number' || typeof formData[element+'WalletDailyVolume'] == 'string') && formData[element+'WalletDailyVolume'] > 0) ? +formData[element+'WalletDailyVolume'] : 0;
      formData.stakingLevel[element].walletMonthlyVolume = ((typeof formData[element+'WalletMonthlyVolume'] == 'number' || typeof formData[element+'WalletMonthlyVolume'] == 'string') && formData[element+'WalletMonthlyVolume'] > 0) ? +formData[element+'WalletMonthlyVolume'] : 0;
      formData.stakingLevel[element].stakingDailyVolume = ((typeof formData[element+'StakingDailyVolume'] == 'number' || typeof formData[element+'StakingDailyVolume'] == 'string') && formData[element+'StakingDailyVolume'] > 0) ? +formData[element+'StakingDailyVolume'] : 0;
      formData.stakingLevel[element].stakingMonthlyVolume = ((typeof formData[element+'StakingMonthlyVolume'] == 'number' || typeof formData[element+'StakingMonthlyVolume'] == 'string') && formData[element+'StakingMonthlyVolume'] > 0) ? +formData[element+'StakingMonthlyVolume'] : 0;
      delete formData[element+'WalletDailyVolume'];
      delete formData[element+'WalletMonthlyVolume'];
      delete formData[element+'StakingDailyVolume'];
      delete formData[element+'StakingMonthlyVolume'];
    });
    let preBookingPercentage = [];
    this.siteSettings.preBookingPercentage.forEach(function(value, index) {
      preBookingPercentage[index] = {};
      preBookingPercentage[index].from = formData['from'+index];
      preBookingPercentage[index].to = formData['to'+index];
      preBookingPercentage[index].bonus = formData['bonus'+index];
      delete formData['from'+index];
      delete formData['to'+index];
      delete formData['bonus'+index];
    });
    formData.preBookingPercentage = preBookingPercentage;
    this.settingsService.UpdateSiteSettings(formData).subscribe((data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        this.notify.showSuccess(data.message);
        this.siteSettings = data.data;
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.notify.showSystemError(err);
    });
  }
  onUpload(event: any, name: string): void {
    const file = event.target.files[0];
    if (file) {
      this.files[name] = file;
    }
  }
}
