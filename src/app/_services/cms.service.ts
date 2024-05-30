import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, AuthResponse } from '../_models/auth';
import { CmsApiResponse } from '../_models/cms';
import { ApiResponse } from '../_models/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CMSAPIService {
    constructor(private httpClient: HttpClient) {}
      getCmsTblDetails(body): Observable<CmsApiResponse> {
        return this.httpClient.post<CmsApiResponse>(
          `${environment.apiUrl}admin/cms/getCMS`,
          body
        );
      }
    addCms(body): Observable<CmsApiResponse> {
      return this.httpClient.post<CmsApiResponse>(
        `${environment.apiUrl}admin/cms/addCMS`,
        body
      );
    }
    updateCms(body): Observable<CmsApiResponse> {
      return this.httpClient.post<CmsApiResponse>(
        `${environment.apiUrl}admin/cms/updateCMS`,
        body
      );
    }
    deletedCms(body): Observable<CmsApiResponse> {
      return this.httpClient.post<CmsApiResponse>(
        `${environment.apiUrl}admin/cms/deleteCMS`,
        body
      );
    }
    changeStatus(body): Observable<CmsApiResponse> {
      return this.httpClient.post<CmsApiResponse>(
        `${environment.apiUrl}admin/cms/changeStatus`,
        body
      );
    }
}