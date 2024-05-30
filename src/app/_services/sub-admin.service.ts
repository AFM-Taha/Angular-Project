import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubAdminTblApiResponse } from '../_models/sub-admin';
import { ApiResponse } from '../_models/core';
import {ActivityLogTblApiResponse} from '../_models/sub-admin';
import { BalanceSetTblApiResponse } from '../_models/sub-admin';
@Injectable({
  providedIn: 'root'
})
export class SubAdminService {

  constructor(private httpClient: HttpClient) { }

  getSubAdminTblDetails(): Observable<SubAdminTblApiResponse> {
      return this.httpClient.get<SubAdminTblApiResponse>(
        `${environment.apiUrl}admin/subAdmin/getSubAdmin`
      );
  }
  getSubAdminTblDetailsfilter(body): Observable<SubAdminTblApiResponse> {
    return this.httpClient.post<SubAdminTblApiResponse>(
      `${environment.apiUrl}admin/subAdmin/getSubAdminfilter`,
      body
    );
}
  addSubAdmin(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/subAdmin/addSubAdmin`,
      body
    );
  }
  getSubAdminById(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/subAdmin/getSubAdminById`,
      body
    );
  }
  updateSubAdmin(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/subAdmin/updateSubAdmin`,
      body
    );
  }
   getActivityLog(body): Observable<ActivityLogTblApiResponse> {
    return this.httpClient.post<ActivityLogTblApiResponse>(
      `${environment.apiUrl}admin/getactivitylogadmin`,
      body
    );
  }
  getUserBalanceSetView(body): Observable<BalanceSetTblApiResponse> {
    return this.httpClient.post<BalanceSetTblApiResponse>(
      `${environment.apiUrl}admin/getUserBalanceSetView`,
      body
    );
  }
  postAdminPage(pageNumber:any){
    return this.httpClient.get(`${environment.apiUrl}admin/getactivitylogadmin?page=${pageNumber}`)
  }

  postNextPairsPage(pageNumber:any){
    return this.httpClient.get(`${environment.apiUrl}admin/subAdmin/getSubAdmin?page=${pageNumber}`)
  }
}
