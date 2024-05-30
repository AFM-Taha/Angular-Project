import { Component, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from './layouts/header/sidebar.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  assetUrl = environment.assetUrl;
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;
  openSideNav = false;

  constructor(private sideNavService: SidebarService) {}

  ngOnInit(): void {
    this.sideNavService.sideNavToggleSubject.subscribe((data) => {
      this.openSideNav = data;
    });
  }
}
