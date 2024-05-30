import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubAdminService } from 'src/app/_services/sub-admin.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-admin-form',
  templateUrl: './sub-admin-form.component.html',
  styleUrls: ['./sub-admin-form.component.scss']
})
export class SubAdminFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  icon: File;
  _id: any;
  readOnlyData: boolean = false;
  modules: any = {
    "Users": { "View": 0, "Edit": 0 },
    "Wallet Balance": { "View": 0 },
    "Transactions": { "View": 0, "Edit": 0 },
    "P2P Appeal History": { "View": 0, "Edit": 0 },
    "P2P Transaction History": { "View": 0, "Edit": 0 },
    "P2P Pairs": { "View": 0, "Edit": 0 },
    "P2P Report": { "View": 0, "Edit": 0 },
    "P2P Blocked Users": { "View": 0, "Edit": 0 },
    "P2P FeedBack List": { "View": 0, "Edit": 0 },
    "P2P Settings": { "View": 0, "Edit": 0 },
    // "Staking": { "View": 0, "Edit": 0 },
    // "Staking History": { "View": 0 },
    // "Staking History": { "View": 0 },
    // "ICO": { "View": 0, "Edit": 0 },
    // "ICO History": { "View": 0 },
    "Trade History": { "View": 0 },
    "Order History": { "View": 0 },
    "Sub Admin": { "View": 0, "Edit": 0 },
    "Currency": { "View": 0, "Edit": 0 },
    "Pairs": { "View": 0, "Edit": 0 },
    "Site Settings": { "View": 0, "Edit": 0 },
    "News Letter": { "View": 0, "Edit": 0 },
    "Admin Bank Details": { "View": 0, "Edit": 0 },
    "Blogs": { "View": 0, "Edit": 0 },
    "Futures Subacc": { "View": 0, "Edit": 0 },
    "Userskyc": { "View": 0, "Edit": 0 },
    "Push Notification": { "View": 0, "Edit": 0 },
    // "Staking Enabled": { "View": 0, "Edit": 0 },
  }
  roles: any = {
    "Users": { "View": 0, "Edit": 0 },
    "Wallet Balance": { "View": 0 },
    "Transactions": { "View": 0, "Edit": 0 },
    "Staking": { "View": 0, "Edit": 0 },
    "Staking History": { "View": 0 },
    "ICO": { "View": 0, "Edit": 0 },
    "ICO History": { "View": 0 },
    "Trade History": { "View": 0 },
    "Order History": { "View": 0 },
    "Sub Admin": { "View": 0, "Edit": 0 },
    "Currency": { "View": 0, "Edit": 0 },
    "Pairs": { "View": 0, "Edit": 0 },
    "Site Settings": { "View": 0, "Edit": 0 },
    "News Letter": { "View": 0, "Edit": 0 },
    "Admin Bank Details": { "View": 0, "Edit": 0 },
    "Blogs": { "View": 0, "Edit": 0 },
    "Futures Subacc": { "View": 0, "Edit": 0 },
    "Userskyc": { "View": 0, "Edit": 0 },
    "Push Notification": { "View": 0, "Edit": 0 },
    "Staking Enabled": { "View": 0, "Edit": 0 }
  }
  constructor(
    private fb: FormBuilder,
    private subAdminService: SubAdminService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params._id;
    let formFields = {
      status: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    };
    this.form = this.fb.group(formFields);
    if (this._id != 1) {
      this.readOnlyData = true;
      this.subAdminService.getSubAdminById({ _id: this._id }).subscribe((data: any) => {
        if (data.status) {
          let formData = data.message;
          this.roles = formData.roles;
          this.form.patchValue(formData);
        } else {
          this.notify.showSuccess(data.message);
          this.router.navigate(['dashboard', 'sub-admin-list']);
        }
      });
    }
  }

  isParentChecked(field1) {
    let checkValue = false;
    if (typeof this.roles[field1] == 'object') {
      for (var key in this.roles[field1]) {
        if (this.roles[field1][key] == 1) {
          checkValue = true;
          break;
        }
      }
    }
    return checkValue;
  }
  checkParentValue(field1) {
    let checkValue = false;
    if (typeof this.roles[field1] == 'object') {
      for (var key in this.roles[field1]) {
        if (this.roles[field1][key] == 1) {
          checkValue = true;
          break;
        }
      }
    } else {
      if (typeof this.roles[field1] != 'object') {
        this.roles[field1] = this.modules[field1];
        this.checkParentValue(field1);
        return;
      }
    }
    let setValue = checkValue ? 0 : 1;
    let newRoles = this.modules[field1];
    for (var key1 in newRoles) {
      this.roles[field1][key1] = setValue;
    }
  }
  isChildChecked(field1, field2) {
    let checkValue = false;
    if (typeof this.roles[field1] == 'object' && typeof this.roles[field1][field2] == 'number' && this.roles[field1][field2] == 1) {
      checkValue = true;
    }
    return checkValue;
  }
  checkChildValue(field1, field2) {
    let checkValue = false;
    if (typeof this.roles[field1] == 'object' && typeof this.roles[field1][field2] == 'number' && this.roles[field1][field2] == 1) {
      checkValue = true;
    } else {
      if (typeof this.roles[field1] != 'object') {
        this.roles[field1] = this.modules[field1];
        this.checkChildValue(field1, field2);
        return;
      }
    }
    let setValue = checkValue ? 0 : 1;
    if (setValue == 1 && field2 == 'Edit') {
      this.roles[field1].View = 1;
    }
    if (field2 == 'View' && setValue == 0) {
      this.roles[field1].Edit = 0;
    }
    this.roles[field1][field2] = setValue;
  }

  compareItems(i1, i2) {
    return i1 == i2;
  }

  formSubmitHandler(): void {
    let formData = this.form.value;
    formData.roles = this.roles;
    if (this._id != 1) {
      formData._id = this._id;
      this.subAdminService.updateSubAdmin(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.router.navigate(['dashboard', 'sub-admin-list']);
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      });
    } else {
      this.subAdminService.addSubAdmin(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.router.navigate(['dashboard', 'sub-admin-list']);
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
    image.onload = function (event: any) {
      return true;
    }
    image.onerror = function () {
      return false;
    }
    image.src = url;
  }
  closeDialog(): void {
    this.router.navigate(['dashboard', 'currency-list']);
  }

  onlogoURIChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.icon = file;
    }
  }
}
