import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, AuthResponse } from '../_models/auth';
import { EmailTemplateApiResponse } from '../_models/email-template';
import { ApiResponse } from '../_models/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplateAPIService {
    constructor(private httpClient: HttpClient) {}
        getEmailTemplateTblDetails(body): Observable<EmailTemplateApiResponse> {
        return this.httpClient.post<EmailTemplateApiResponse>(
          `${environment.apiUrl}admin/emailTemplate/getemailTemplate`,
          body
        );
      }
      addEmailTemplate(body): Observable<EmailTemplateApiResponse> {
      return this.httpClient.post<EmailTemplateApiResponse>(
        `${environment.apiUrl}admin/emailTemplate/addEmailTemplate`,
        body
      );
    }
    updateEmailTemplate(body): Observable<EmailTemplateApiResponse> {
      return this.httpClient.post<EmailTemplateApiResponse>(
        `${environment.apiUrl}admin/emailTemplate/updateEmailTemplate`,
        body
      );
    }
}