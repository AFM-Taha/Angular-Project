import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { MyUploadAdapter } from "src/myUploadAdapter";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { stakeEnabledUser } from 'src/app/_models/stakeEnabledUser';
@Component({
  selector: 'app-stake-enabled-user',
  templateUrl: './stake-enabled-user.component.html',
  styleUrls: ['./stake-enabled-user.component.scss']
})
export class stakeenableduserComponent implements OnInit {
  displayedColumns: string[] = [];
  form: FormGroup;
  isLoading = false;
  public editor: ClassicEditor;
  ckeConfig: any;
  page = 1;
  PageData: any;
  len: any;
  buttonDisabled = true;
  limit: number = 10;
  offset: number = 0;
  length: any;
  stakeTbl = new MatTableDataSource<stakeEnabledUser>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

 
  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private settingsService: SettingsService,
    private route: ActivatedRoute
  ) {
    this.displayedColumns = [
      'email',
      'action'
    ];
    this.editor = ClassicEditor;
  }

  public onReady(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
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
      userEmail: ['', Validators.required]
    });
  }
  compareItems(i1, i2) {
    return i1 == i2;
  }
  formSubmitHandler = (): void => {
    this.isLoading = true;
    this.settingsService.addStakingEnabled(this.form.value).subscribe((data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        this.notify.showSuccess(data.message);
        var pagNation = {
          limit:10,
          offset: 0
        }
        this.populateTable(pagNation);
        this.form.patchValue({
          userEmail: ''
        });
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.notify.showSystemError(err);
    });
  }
  populateTable(obj): void {
    this.isLoading = true;
    var data = {
      limit: obj.limit,
      offset: obj.offset
    }
    this.settingsService
      .getStakeEnableUser(data)
      .subscribe(
        (result) => {
          this.stakeTbl.data = result.getDocsTblDetails;
          this.length = result.total;
          this.isLoading = false;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }

  deleteStackEnabled(_id: string) {
    if (confirm("Are you sure to delete this User?")) {
      let formData: any = {};
      formData._id = _id;
      this.settingsService.deleteEnabledUser(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          var pagNation = {
            limit:10,
            offset: 0
          }
          this.populateTable(pagNation);
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      });
    }
  }
  changepage(event) {
 
    if (event.pageSize != this.limit) {
      var obj1 = {
        offset: event.pageSize * event.pageIndex,
        limit: event.pageSize
      }
      this.populateTable(obj1);
     
    }
    else {
      var obj = {
        offset: event.pageIndex * this.limit,
        limit: this.limit
      }
      this.populateTable(obj);
    }
  }
  
}