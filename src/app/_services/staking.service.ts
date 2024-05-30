import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StakingTblApiResponse } from '../_models/staking';
import { ApiResponse } from '../_models/core';
import {StakRefCommiTblApiResponse} from '../_models/staking';
@Injectable({
  providedIn: 'root'
})
export class StakingService {

  constructor(private httpClient: HttpClient) { }

  getStakingTblDetails(): Observable<StakingTblApiResponse> {
      return this.httpClient.get<StakingTblApiResponse>(
        `${environment.apiUrl}admin/staking/getStaking`
      );
  }
  getStakingTblDetailsfilter(body): Observable<StakingTblApiResponse> {
    return this.httpClient.post<StakingTblApiResponse>(
      `${environment.apiUrl}admin/staking/getStakingfilter`,
      body
    );
}
  addStaking(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/staking/addStaking`,
      body
    );
  }
  getStakingById(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/staking/getStakingById`,
      body
    );
  }
  updateStaking(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/staking/updateStaking`,
      body
    );
  }
  getStakingReferral(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(
      `${environment.apiUrl}admin/staking/getRefstakingComissionAdmin`,
    );  
  }
  getStakingReferralfilter(body): Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/staking/getRefstakingComissionAdminfilter`,
      body
    );  
  }
  postNextPairsPage(pageNumber:any){
    return this.httpClient.get(`${environment.apiUrl}admin/staking/getStaking?page=${pageNumber}`)
  }
}
