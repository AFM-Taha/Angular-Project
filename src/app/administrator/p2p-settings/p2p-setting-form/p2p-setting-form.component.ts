import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/_services/settings.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { p2pSettingsService } from 'src/app/_services/p2pSettings.service';

@Component({
  selector: 'app-p2p-setting-form',
  templateUrl: './p2p-setting-form.component.html',
  styleUrls: ['./p2p-setting-form.component.scss']
})
export class P2PSettingFormComponent implements OnInit {
  form: FormGroup;
  p2pSettings:any;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private p2pSettingsService: p2pSettingsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      minPercentage: ['', Validators.required],
			maxPercentage: ['', Validators.required],
			selectionLimit: ['', Validators.required],
			creationLimit: ['', Validators.required],
    });
    this.p2pSettingsService.getP2PSettings().subscribe((res: any) => {
      this.p2pSettings = res.message;
      this.form.patchValue({
        minPercentage: this.p2pSettings.minPercentage,
        maxPercentage: this.p2pSettings.maxPercentage,
        creationLimit: this.p2pSettings.creationLimit,
        selectionLimit: this.p2pSettings.selectionLimit,
      });
      // this.isLoadingIntial = false;
    });
	}
  formSubmitHandler(): void {
    this.isLoading = true;
    this.p2pSettingsService.UpdateP2PSettings(this.form.value).subscribe((data: any) => {
      if (data.status === true) {
        this.notify.showSuccess(data.message);
        this.isLoading = false;
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.notify.showSystemError(err);
    });
  }
  // updateSiteData(){
  //   let formData = JSON.parse(JSON.stringify(this.form.value));
  //   formData.withdrawLevel = {};
  //   formData.stakingLevel = {};
  //   this.level.forEach(element => {
  //     formData.withdrawLevel[element] = {};
  //     formData.withdrawLevel[element].dailyVolume = ((typeof formData[element+'DailyVolume'] == 'number' || typeof formData[element+'DailyVolume'] == 'string') && formData[element+'DailyVolume'] > 0) ? +formData[element+'DailyVolume'] : 0;
  //     formData.withdrawLevel[element].monthlyVolume = ((typeof formData[element+'MonthlyVolume'] == 'number' || typeof formData[element+'MonthlyVolume'] == 'string') && formData[element+'MonthlyVolume'] > 0) ? +formData[element+'MonthlyVolume'] : 0;
  //     delete formData[element+'DailyVolume'];
  //     delete formData[element+'MonthlyVolume'];
  //     formData.stakingLevel[element] = {};
  //     formData.stakingLevel[element].walletDailyVolume = ((typeof formData[element+'WalletDailyVolume'] == 'number' || typeof formData[element+'WalletDailyVolume'] == 'string') && formData[element+'WalletDailyVolume'] > 0) ? +formData[element+'WalletDailyVolume'] : 0;
  //     formData.stakingLevel[element].walletMonthlyVolume = ((typeof formData[element+'WalletMonthlyVolume'] == 'number' || typeof formData[element+'WalletMonthlyVolume'] == 'string') && formData[element+'WalletMonthlyVolume'] > 0) ? +formData[element+'WalletMonthlyVolume'] : 0;
  //     formData.stakingLevel[element].stakingDailyVolume = ((typeof formData[element+'StakingDailyVolume'] == 'number' || typeof formData[element+'StakingDailyVolume'] == 'string') && formData[element+'StakingDailyVolume'] > 0) ? +formData[element+'StakingDailyVolume'] : 0;
  //     formData.stakingLevel[element].stakingMonthlyVolume = ((typeof formData[element+'StakingMonthlyVolume'] == 'number' || typeof formData[element+'StakingMonthlyVolume'] == 'string') && formData[element+'StakingMonthlyVolume'] > 0) ? +formData[element+'StakingMonthlyVolume'] : 0;
  //     delete formData[element+'WalletDailyVolume'];
  //     delete formData[element+'WalletMonthlyVolume'];
  //     delete formData[element+'StakingDailyVolume'];
  //     delete formData[element+'StakingMonthlyVolume'];
  //   });
  //   let preBookingPercentage = [];
  //   this.siteSettings.preBookingPercentage.forEach(function(value, index) {
  //     preBookingPercentage[index] = {};
  //     preBookingPercentage[index].from = formData['from'+index];
  //     preBookingPercentage[index].to = formData['to'+index];
  //     preBookingPercentage[index].bonus = formData['bonus'+index];
  //     delete formData['from'+index];
  //     delete formData['to'+index];
  //     delete formData['bonus'+index];
  //   });
  //   formData.preBookingPercentage = preBookingPercentage;
  //   this.settingsService.UpdateSiteSettings(formData).subscribe((data: any) => {
  //     this.isLoading = false;
  //     if (data.status === true) {
  //       this.notify.showSuccess(data.message);
  //       this.siteSettings = data.data;
  //     } else {
  //       this.notify.showError(data.message);
  //     }
  //   }, (err) => {
  //     this.notify.showSystemError(err);
  //   });
  // }
  // onUpload(event: any, name: string): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.files[name] = file;
  //   }
  // }
}
