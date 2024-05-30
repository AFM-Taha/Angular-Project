import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocsService } from 'src/app/_services/docs.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-docs-form',
  templateUrl: './docs-form.component.html',
  styleUrls: ['./docs-form.component.scss']
})
export class DocsFormComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  _id: any;
  image: File;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private docsService: DocsService,
    private notify: NotificationService,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params._id;
    this.inItForm();
  }
  onlogoURIChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }
  compareItems(i1, i2) {
    return i1 == i2;
  }
  inItForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      link: ['', Validators.required],
      flag: [''],
      metaTitle: ['', Validators.required],
      metaKeyword: ['', Validators.required],
      metaDescription: ['', Validators.required],
      document: ['', Validators.required]
    });
    if (this._id != 1) {
      this.docsService.getDocsById({ _id: this._id }).subscribe((data: any) => {
        if (data.status) {
          this.form.patchValue({
            name: data.getDocsTblDetails.name,
            link: data.getDocsTblDetails.link,
            flag: data.getDocsTblDetails.flag,
            metaTitle: data.getDocsTblDetails.metaTitle,
            metaKeyword: data.getDocsTblDetails.metaKeyword,
            metaDescription: data.getDocsTblDetails.metaDescription,
            document: data.getDocsTblDetails.document
          });
        } else {
          this.notify.showSuccess(data.message);
          this.router.navigate(['dashboard', 'blogs']);
        }
      });
    }
  }

  formSubmitHandler = (): void => {
    const formData = new FormData();
    let sizeFile: any = 0;
    if (this.image) {
      let fileToUpload: any = this.image;
      let fileName: string = 'blogs'//get name from form for example
      let fileExtension: string = fileToUpload.name.split('?')[0].split('.').pop();
      formData.append('images[]', fileToUpload, fileName + '.' + fileExtension);
      sizeFile++;
    }
    this.isLoading = true;
    if (sizeFile > 0) {
      this.settingsService.UploadImage(formData, sizeFile, 'blogs').subscribe((data: any) => {
        if (data.status === true) {
          this.form.value.image = data.message[0].location
          this.updateDocsData();
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      });
    } else {
      this.updateDocsData();
    }
  }
  updateDocsData() {
    if (this._id != 1) {
      let formData = this.form.value;
      formData._id = this._id;
      this.docsService.updateDocs(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.router.navigate(['dashboard', 'blogs']);
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      });
    } else {
      let dataForm = this.form.value;
      if (typeof this.form.value.image == 'string') {
        this.docsService.addDocs(dataForm).subscribe((data: any) => {
          if (data.status === true) {
            this.notify.showSuccess(data.message);
            this.router.navigate(['dashboard', 'blogs']);
          } else {
            this.notify.showError(data.message);
          }
        }, (err) => {
          this.notify.showSystemError(err);
        });
      } else {
        this.notify.showError('Please upload image');
      }
    }
  }

}
