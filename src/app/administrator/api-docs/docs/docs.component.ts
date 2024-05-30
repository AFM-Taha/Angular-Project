import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { Docs } from 'src/app/_models/docs';
import { DocsService } from 'src/app/_services/docs.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  assetUrl = environment.assetUrl;
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  docsTbl = new MatTableDataSource<Docs>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private ref: ChangeDetectorRef, private router: Router, private docsService: DocsService, private notify: NotificationService) {
    this.displayedColumns = [
      'name',
      'dateTime',
      'action'
    ];
  }

  ngOnInit(): void {
    this.docsTbl.paginator = this.paginator;
    this.paginator.page.subscribe((response: any) => {
      this.paginator.pageIndex = response.pageIndex;
      this.paginator.pageSize = response.pageSize;
      this.populateTable();
    });
    this.docsTbl.sort = this.sort;
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }


  populateTable(): void {
    this.isLoading = true;
    this.docsService
      .getDocsTblDetails()
      .subscribe(
        (result) => {
          this.docsTbl.data = result.getDocsTblDetails;
          this.isLoading = false;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }

  ngAfterViewInit(): void {
    this.populateTable();
  }
  addDocs(): void {
    this.router.navigate(['dashboard', 'blogs', '1']);
  }

  editDocs(_id: string) {
    this.router.navigate(['dashboard', 'blogs', _id]);
  }

  deleteDocs(_id: string) {
    if (confirm("Are you sure to delete this Blog?")) {
      let formData: any = {};
      formData._id = _id;
      this.docsService.deleteDocs(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.populateTable();
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      });
    }
  }

}
