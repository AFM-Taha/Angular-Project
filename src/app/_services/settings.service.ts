import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, AuthResponse } from '../_models/auth';
import { StakeEnableApiResponse } from '../_models/stakeEnabledUser';
import { ApiResponse } from '../_models/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private httpClient: HttpClient) {}

  login(body: Auth): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${environment.apiUrl}admin/login`,
      body
    );
  }
  checkAccess(module,type) {
    if(window.localStorage.getItem('admin_role') == '1') {
      return true;
    } else {
      let roles = JSON.parse(window.localStorage.getItem('admin_page_access'))
      let checkValue = false;
      if(typeof roles[module] == 'object') {
        if(typeof roles[module][type] == 'number' && roles[module][type] == 1) {
          checkValue = true;
        }
      }
      if(checkValue) {
        return true;
      } else {
        return false;
      }
    }
  }
  getSiteSettings(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      `${environment.apiUrl}admin/getSiteSettings`
    );
  }
  UpdateSiteSettings(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/UpdateSiteSettings`,
      body
    );
  }
  getBankDetails(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      `${environment.apiUrl}admin/getBankDetails`
    );
  }
  updateBankDetails(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/updateBankDetails`,
      body
    );
  }
  UploadImage(body: any, sizeFile,type): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${environment.apiUrl}admin/fileUpload?sizeFile=${sizeFile}&&type=${type}`,
      body
    );
  }
  getDashboardCount(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      `${environment.apiUrl}admin/getDashboardCount`
    );
  }
  
  // getDashboardCount(): Observable<ApiResponse> {
  //   return this.httpClient.get<ApiResponse>(
  //     `${environment.apiUrl}admin/getDashboardCount?target=24hrs`
  //   );
  // }
  makeAdminMove(type: string): Observable<ApiResponse> {
    if(type == 'token') {
      return this.httpClient.get<ApiResponse>(
        `${environment.apiUrl}adminWallet/adminTokenMoveProcess`
      );
    } else {
      return this.httpClient.get<ApiResponse>(
        `${environment.apiUrl}adminWallet/adminMoveProcess`
      );
    }
  }
  getMyProfile(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      `${environment.apiUrl}admin/getMyProfile`
    );
  }
  updateMyProfile(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/updateMyProfile`,
      body
    );
  }
  changePassword(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/changePassword`,
      body
    );
  }
  sendNewsLetter(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/sendNewsLetter`,
      body
    );
  }
  sendPushNotification(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/sendPushNotification`,
      body
    );
  }
  addStakingEnabled(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/addStakingEnabled`,
      body
    );
  }
  deleteEnabledUser(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/deleteEnabledUser`,
      body
    );
  }
  getStakeEnableUser(body): Observable<StakeEnableApiResponse> {
    return this.httpClient.post<StakeEnableApiResponse>(
      `${environment.apiUrl}admin/getStakeEnableUser`,
      body
    );
  }
  updateUserBalance(body): Observable<StakeEnableApiResponse> {
    return this.httpClient.post<StakeEnableApiResponse>(
      `${environment.apiUrl}admin/updateUserBalance`,
      body
    );
  }
  getCurrencyBalance(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
      `${environment.apiUrl}adminWallet/getCurrencyBalance`
    );
  }
  searchDashboard(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/getDashboardCount`,
      body
    );
  }
}
