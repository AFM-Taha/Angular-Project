import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SettingsService } from 'src/app/_services/settings.service';
import { AutoLogoutService } from './_services/core/auto-logout.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private settingsService: SettingsService,
    private autoLogoutService: AutoLogoutService,
    private titleService: Title
) { }
  title = 'admin';
  ngOnInit(): void {
    this.settingsService.getSiteSettings().subscribe((res: any) => {
      this.titleService.setTitle(res.message.adminSiteName);
    });
  }
}
