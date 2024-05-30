import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SettingsService } from 'src/app/_services/settings.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

const incr = 1;
@Component({
  selector: 'app-wallet-balance',
  templateUrl: './wallet-balance.component.html',
  styleUrls: ['./wallet-balance.component.scss']
})


export class WalletBalanceComponent implements OnInit {
  currencyData: any;
  constructor(
    private settingsService: SettingsService,
    private notify: NotificationService,
    private dialog: MatDialog
    ) { }
  progress = 0;
  loader:any=true;
  ngOnInit(): void {

    setInterval(() => this.manageProgress(), 150 )
    this.settingsService.getCurrencyBalance().subscribe((res: any) => {
      if (res.status) {
        this.currencyData = res.data;
        this.loader=false;
      }
    });
  }
  manageProgress() {
    if(this.progress === 100) {
      this.progress = 0;
    } else {
      this.progress = this.progress + incr;
    }
  }
  copyAddress(address){
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (address));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    this.notify.showSuccess('Address copied successfully!');
    document.execCommand('copy');
  }


}
