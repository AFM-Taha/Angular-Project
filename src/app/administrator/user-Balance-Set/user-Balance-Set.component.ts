import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyUploadAdapter } from "src/myUploadAdapter";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { stakeEnabledUser } from 'src/app/_models/stakeEnabledUser';
import { CurrencyService } from 'src/app/_services/currency.service';
@Component({
  selector: 'app-user-Balance-Set',
  templateUrl: './user-Balance-Set.component.html',
  styleUrls: ['./user-Balance-Set.component.scss']
})
export class userBalanceSetComponent implements OnInit {
  displayedColumns: string[] = [];
  form: FormGroup;
  isLoading = false;
  public editor: ClassicEditor;
  ckeConfig: any;
  page = 1;
  currencies = [];
  buttonDisabled = true;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private settingsService: SettingsService,
    private currencyService: CurrencyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.displayedColumns = [
      'email',
      'action'
    ];
    this.editor = ClassicEditor;
  }
  ngOnInit(): void {
    this.inItForm();
    var pagNation = {
      limit:10,
      offset:0
    }
    this.populateTable(pagNation);
  }
  inItForm(): void {
    this.form = this.fb.group({
      userEmail: ['', Validators.required],
      walletType: ['', Validators.required],
      userAmount: ['', Validators.required],
      userDecription: ['', Validators.required],
      currencyId: ['']
    });
  }
  compareItems(i1, i2) {
    return i1 == i2;
  }
  getDisabledValue() {
    if(this.form.value.walletType=='mainWallet'){
      return false; 
    }
  else{
    this.notify.showSuccess('Default Currency USDT Selected');
    return true; 
  }
   
  }
  formSubmitHandler = (): void => {
    this.isLoading = true;
    this.settingsService.updateUserBalance(this.form.value).subscribe((data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        this.notify.showSuccess(data.message);
        this.form.patchValue({
          userEmail: '',
          walletType:'',
          userAmount: '',
          userDecription: '',
          currencyId: ''
        });
        this.router.navigate(['dashboard', 'user-Balance-Set-View']);
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.notify.showSystemError(err);
    });
  }
  populateTable(obj): void {
    this.isLoading = true;
      this.currencyService
      .getCurrencyTblDetails()
      .subscribe(
        (result) => {
          this.currencies = result.getCurrencyTblDetails;
          this.isLoading = false;
        },
        (err) => {

        }
      );
  }

 
 
}