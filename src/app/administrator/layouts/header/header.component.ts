import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { environment } from 'src/environments/environment';
import { SidebarService } from './sidebar.service';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private sideBarService: SidebarService,
    private router: Router,
    private authService: AuthService,
    private notify: NotificationService,
    private settingsService: SettingsService
  ) { }

  assetUrl = environment.assetUrl;
  status = true;
  siteSettings: any = {};
  myProfile: any = {};
  ngOnInit(): void {
    this.settingsService.getSiteSettings().subscribe((res: any) => {
      this.siteSettings = res.message;
    });
    this.settingsService.getMyProfile().subscribe((res: any) => {
      this.myProfile = res.getProfileDetails;
    });
  }

  clickMenu(): void {
    this.sideBarService.toggle(!this.status);
    this.status = !this.status;
  }
  logout(): void {
    this.authService.logout().subscribe((resData) => {
      if (resData) {
        this.router.navigate(['login']);
      } else {
        this.notify.showSystemError(resData);
      }
    });
  }

  redirectBtnHandler(): void {
    this.router.navigate(['dashboard', 'my-profile']);
  }
  
}
