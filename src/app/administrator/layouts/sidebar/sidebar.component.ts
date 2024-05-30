import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  links = []
  linksList = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      type: '',
      url: './',
    },
    {
      name: 'Wallet Balance',
      icon: 'dashboard',
      type: 'Wallet Balance',
      url: 'wallet-balance',
    },
    {
      name: 'Users List',
      type: 'Users',
      icon: 'list',
      url: 'users-list',
    },
    // {
    //   name: 'Users List Auto KYC',
    //   type: 'Userskyc',
    //   icon: 'list',
    //   url: 'users-listkyc',
    // },
    {
      name: 'Transactions List',
      type: 'Transactions',
      icon: 'list',
      url: 'transactions-list',
    },
    {
      name: 'Buyorder List',
      type: 'buyorder',
      icon: 'list',
      url: 'buyorder-list',
    },
    {
      name: 'Trade History',
      type: 'Trade History',
      icon: 'list',
      url: 'trade-history',
    },
    {
      name: 'Order History',
      type: 'Order History',
      icon: 'list',
      url: 'order-history',
    },
    {
      name: 'Order TDS History',
      type: 'Order TDS History',
      icon: 'list',
      url: 'user-TradeTds',
    },
    {
      name: 'Admin Activity ',
      type: 'Admin Activity',
      icon: 'list',
      url: 'adminactivitylog',
    },
    {
      name: 'Sub Admin List',
      type: 'Sub Admin',
      icon: 'list',
      url: 'sub-admin-list',
    },
    {
      name: 'Currency List',
      type: 'Currency',
      icon: 'list',
      url: 'currency-list',
    },
    {
      name: 'Spot Pairs List',
      type: 'Pairs',
      icon: 'list',
      url: 'pairs-list',
    },
    // {
    //   name: 'Derivatives Pairs List',
    //   type: 'Derivatives Pairs',
    //   icon: 'list',
    //   url: 'derivatives-pairs-list',
    // },
    {
      name: 'CMS List',
      type: 'Cms',
      icon: 'list',
      url: 'cms-list',
    },
    {
      name: 'Email Template',
      type: 'Email Template',
      icon: 'list',
      url: 'email-template',
    },
    // {
    //   name: 'Staking List',
    //   type: 'Staking',
    //   icon: 'list',
    //   url: 'staking-list',
    // },
    // {
    //   name: 'Staking History',
    //   type: 'Staking History',
    //   icon: 'list',
    //   url: 'staking-history-list',
    // },
    {
      name: 'Referral',
      type: '',
      icon: 'list',
      url: 'Referral',
    },
    {
      name: 'Site Settings',
      type: 'Site Settings',
      icon: 'admin_panel_settings',
      url: 'site-settings',
    },
    {
      name: 'News Letter',
      type: 'News Letter',
      icon: 'admin_panel_settings',
      url: 'news-letter',
    },
    // {
    //   name: 'Staking Enabled',
    //   type: 'Staking Enable',
    //   icon: 'admin_panel_settings',
    //   url: 'staking-enable',
    // },
    {
      name: 'Manual Balance Updation',
      type: 'Manual Balance Updation',
      icon: 'admin_panel_settings',
      url: 'user-Balance-Set',
    },
    {
      name: 'Manual User Balance',
      type: 'Manual User Balance',
      icon: 'admin_panel_settings',
      url: 'user-Balance-Set-View',
    },
    {
      name: 'P2P Pairs List',
      type: 'P2P Pairs List',
      icon: 'list',
      url: 'p2p-pairs-list',
    },
    {
      name: 'P2P Orders',
      type: 'P2P Orders',
      icon: 'admin_panel_settings',
      url: 'p2p-orders-list',
    },
    {
      name: 'P2P Transaction History',
      type: 'P2P Transaction History',
      icon: 'admin_panel_settings',
      url: 'p2p-transaction-history-list',
    },
    {
      name: 'P2P Appeal History',
      type: 'P2P Appeal History',
      icon: 'admin_panel_settings',
      url: 'p2p-appeal-history-list',
    },
    {
      name: 'P2P Report',
      type: 'P2P Report',
      icon: 'admin_panel_settings',
      url: 'p2p-report',
    },
    {
      name: 'P2P Blocked Users',
      type: 'P2P Blocked Users',
      icon: 'admin_panel_settings',
      url: 'p2p-blocked-users',
    },
    {
      name: 'P2P FeedBack List',
      type: 'P2P FeedBack List',
      icon: 'admin_panel_settings',
      url: 'p2p-feedback-list',
    },
    {
      name: 'P2P Settings',
      type: 'P2P Settings',
      icon: 'admin_panel_settings',
      url: 'p2p-settings',
    },
    {
      name: 'Faq',
      type: 'Faq',
      icon: 'admin_panel_settings',
      url: 'faq-list',
    },
    // {
    //   name: 'Push Notification',
    //   type: 'Push Notification',
    //   icon: 'admin_panel_settings',
    //   url: 'push-notification',
    // },
    {
      name: 'Admin Bank Details',
      type: 'Admin Bank Details',
      icon: 'admin_panel_settings',
      url: 'admin-bank',
    },
    {
      name: 'Futures Subacc',
      type: 'Futures Subacc',
      icon: 'admin_panel_settings',
      url: 'futures-subacc',
    },
    // {
    //   name: 'Blogs',
    //   type: 'Blogs',
    //   icon: 'list',
    //   url: 'blogs',
    // }
    // {
    //   name: 'Futures Subacc',
    //   type: 'Blogs',
    //   icon: 'list',
    //   url: 'blogs',
    // }
  ];
  data: any = {};

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.links = [];
    this.settingsService.getMyProfile().subscribe((res: any) => {
      this.data = res.getProfileDetails;
      if (1 == 1) {
        // if (this.data.role == 1) {
        console.log(this.data);
        this.links = this.linksList;
        window.localStorage.setItem('admin_role', this.data.role);
      } else {
        console.log(this.data);
        window.localStorage.setItem('admin_page_access', JSON.stringify(this.data.roles));
        this.linksList.forEach(element => {
          if (element.type == '') {
            this.links.push(element);
          } else {
            let checkValue = false;
            if (typeof this.data.roles[element.type] == 'object') {
              for (var key in this.data.roles[element.type]) {
                if (this.data.roles[element.type][key] == 1) {
                  checkValue = true;
                  break;
                }
              }
            }
            if (checkValue) {
              this.links.push(element);
            }
          }
        })
      }
    });
  }
}
