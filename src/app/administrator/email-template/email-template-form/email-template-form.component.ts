import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyService } from 'src/app/_services/currency.service';
import { EmailTemplateAPIService } from 'src/app/_services/emailtemplate.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { MyUploadAdapter } from "src/myUploadAdapter";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-email-template-form',
  templateUrl: './email-template-form.component.html',
  styleUrls: ['./email-template-form.component.scss']
})
export class EmailTemplateFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  icon: File;
  siteSettings: any;

  public editor: ClassicEditor;
  public editorConfig = {
  image: {
    image: {
      resizeUnit: 'px'
  },
    resizeOptions: [
      {
          name: 'resizeImage:original',
          value: null,
          label: 'Original'
      },
      {
          name: 'resizeImage:40',
          value: '40',
          label: '40%'
      },
      {
          name: 'resizeImage:60',
          value: '60',
          label: '60%'
      }
  ],
    // image plugin config
    toolbar: [ 'toggleImageCaption', 'imageTextAlternative', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'resizeImage' ],
    styles: [
      'alignLeft',
      'alignCenter',
      'alignRight'
    ]
  },

  // simpleUpload: {
  //     uploadUrl: `${environment.apiUrl}admin/fileUpload?sizeFile=1&&type=ckeditor`
  // }
}
  constructor(
    private dialogRef: MatDialogRef<EmailTemplateFormComponent>,
    private fb: FormBuilder,
    private EmailTemplateService: EmailTemplateAPIService,
    private notify: NotificationService,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.editor = ClassicEditor;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      hint: ['', Validators.required],
      content: ['', Validators.required],
      subject: ['',Validators.required],
      status: ['', false]
    });
    this.data = this.data.editData;
    if(this.data != ''){
      this.form.patchValue(this.data);
    }
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
  closeDialog(): void {
    this.dialogRef.close({ event : 'close', data:{status: false}});
  }
  formSubmitHandler(): void {
    const formData = new FormData();
    let sizeFile:any = 0;
    if(this.icon){
      let fileToUpload: any = this.icon;
      let fileName:string = 'currency'//get name from form for example
      let fileExtension:string = fileToUpload.name.split('?')[0].split('.').pop();
      formData.append('images[]', fileToUpload, fileName+'.'+fileExtension);
      sizeFile++;
  }
  this.isLoading = true;
  if(sizeFile > 0) {
    this.settingsService.UploadImage(formData,sizeFile,'currency').subscribe((data: any) => {
      if (data.status === true) {
        this.form.value.image = data.message[0].location
        this.updateCmsData();
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.isLoading = false;
      this.notify.showSystemError(err);
    });
  } else {
    this.updateCmsData();
  }
  }
  updateCmsData(){
    if(this.data!='') {
      let formData =this.form.value;
      formData._id = this.data._id;
      this.EmailTemplateService.updateEmailTemplate(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.dialogRef.close({ event : 'close', data:{status: true}});
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      });  
    } else {
      let formData = this.form.value;
      this.EmailTemplateService.addEmailTemplate(formData).subscribe((data: any) => {
        if (data.status === true) {
          this.notify.showSuccess(data.message);
          this.dialogRef.close({ event : 'close', data:{status: true}});
        } else {
          this.notify.showError(data.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      }); 
    }
  }
  onlogoURIChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.icon = file;
    }
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
}
