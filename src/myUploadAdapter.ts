import { environment } from 'src/environments/environment';
export class MyUploadAdapter {
  public loader: any;
  public url: string;
  public xhr: XMLHttpRequest;
  public token: string;

  constructor(loader) {
    this.loader = loader;

    // change "environment.BASE_URL" key and API path
    this.url = `${environment.apiUrl}admin/fileUpload?sizeFile=1&&type=ckeditor`;

    // change "token" value with your token
    this.token = localStorage.getItem("token");
  }

  upload() {
    return new Promise(async (resolve, reject) => {
      this.loader.file.then((file) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      });
    });
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    xhr.open("POST", this.url, true);
    // change "Authorization" header with your header
    //xhr.setRequestHeader("Authorization", this.token);
    xhr.responseType = "json";
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());

    xhr.addEventListener("load", () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }
      // change "response.data.fullPaths[0]" with image URL
      resolve({
        default: response.message[0].location,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  _sendRequest(file) {
    const data = new FormData();
    data.append("images[]", file);
    this.xhr.send(data);
  }
}