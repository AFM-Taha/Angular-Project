import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StakingHistoryTblApiResponse } from '../_models/staking-history';
import { ApiResponse } from '../_models/core';

@Injectable({
  providedIn: 'root'
})
export class StakingHistoryService {

  constructor(private httpClient: HttpClient) { }

  getStakingTblDetails(body: any): Observable<StakingHistoryTblApiResponse> {
    return this.httpClient.post<StakingHistoryTblApiResponse>(
      `${environment.apiUrl}admin/staking/getStakingHistoryList`,
      body
    );
  }
  getStakingHistoryDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/staking/getStakingHistoryDetails`,
      body
    );
  }
  getStakingTableDetailsSum(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/staking/getStakingTableDetailsSum`,
      body
    );
}
getuserstakinghistory(body: any): Observable<any> {
  return this.httpClient.post<any>(
    `${environment.apiUrl}admin/staking/stakingdetails`,
    body
  );
}
}
