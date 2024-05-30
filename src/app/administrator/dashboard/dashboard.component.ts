import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/_services/settings.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  dashboardCount: any = { kycPendingUsers: 0, bankPendingUsers: 0, depositPendingUsers: 0, withdrawPendingUsers: 0 }
  constructor(private settingsService: SettingsService, private notify: NotificationService, private router: Router,    private fb: FormBuilder) { }
  loader:any=true;
  ngOnInit(): void {
    this.getDashboardData();
    this.form = this.fb.group({
      fromdate: ['',false],
      todate: ['',false]
    });
  }
  getDashboardData() {
    this.loader = true;
    this.settingsService.getDashboardCount().subscribe((res: any) => {
      if(res.status) {
        console.log(res,"Dashboard");
        this.dashboardCount = res.data;
        this.loader = false;
      }
    });
  }
  adminMove(type: string): void {
    this.loader = true;
    this.settingsService.makeAdminMove(type).subscribe((data: any) => {
      this.loader = false;
      if(data.status) {
        this.notify.showSuccess(data.message);
      } else {
        this.notify.showError(data.message);
      }
    });
  }
  navigateLink(link, query, pageName) {
    if(this.settingsService.checkAccess(pageName, 'View')) {
      this.router.navigateByUrl(link+query);
    }
  }
  searchDashboard(): void {
  this.loader = true;
  this.settingsService.searchDashboard(this.form.value).subscribe((res: any) => {
    if(res.status) {
      this.dashboardCount = res.data;
      this.loader = false;
    }
  });
  }
}
