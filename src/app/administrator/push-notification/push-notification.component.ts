import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { SettingsService } from 'src/app/_services/settings.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { MyUploadAdapter } from "src/myUploadAdapter";

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushnotificationComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  public editor: ClassicEditor;
  ckeConfig: any;
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
    private fb: FormBuilder,
    private notify: NotificationService,
    private settingsService: SettingsService,
  ) {
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
  }
  // ngAfterViewInit(): void {
  // }

  inItForm(): void {
    this.form = this.fb.group({
      type: ['Users', Validators.required],
      content: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  formSubmitHandler = (): void => {
    this.isLoading = true;
    this.settingsService.sendPushNotification(this.form.value).subscribe((data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        this.notify.showSuccess(data.message);
        this.form.patchValue({
          type: 'Users',
          content: '',
          subject: ''
        });
      } else {
        this.notify.showError(data.message);
      }
    }, (err) => {
      this.notify.showSystemError(err);
    });  
  }
}