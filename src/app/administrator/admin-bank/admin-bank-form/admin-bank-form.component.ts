import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/_services/settings.service';
import { NotificationService } from 'src/app/_services/core/notification.service';

@Component({
  selector: 'app-admin-bank-form',
  templateUrl: './admin-bank-form.component.html',
  styleUrls: ['./admin-bank-form.component.scss']
})
export class AdminBankFormComponent implements OnInit {

  form: FormGroup;
  adminBank: any;
  isLoading = false;
  constructor(
    private settingsService: SettingsService,
    private notify: NotificationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inItForm();
    this.settingsService.getBankDetails().subscribe((res: any) => {
      this.adminBank = res.message;
      this.form.patchValue(this.adminBank);
    });
  }
  compareItems(i1, i2) {
    return i1==i2;
  }

  inItForm(): void {
    this.form = this.fb.group({
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      swiftIFSCCode: ['', Validators.required],
      type: ['', Validators.required],
      accountType: ['', Validators.required]
    });
  }

  formSubmitHandler(): void {
    this.isLoading = true;
    this.settingsService.updateBankDetails(this.form.value).subscribe((data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        this.notify.showSuccess(data.message);
        this.adminBank = data.data;
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.notify.showSystemError(err);
    });
  }
}
