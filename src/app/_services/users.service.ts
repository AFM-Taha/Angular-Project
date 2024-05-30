import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersTblApiResponse } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsersTblDetails(body: any): Observable<UsersTblApiResponse> {
    return this.httpClient.post<UsersTblApiResponse>(
      `${environment.apiUrl}admin/users/getUsers`,
      body
    );
  }
  
  getKycUserTblDetails(body: any): Observable<UsersTblApiResponse> {
    return this.httpClient.post<UsersTblApiResponse>(
      `${environment.apiUrl}admin/users/getKycUser`,
      body
    );
}
  getUserDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/users/getUserDetails`,
      body
    );
  }
  updateUser(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/users/updateUser`,
      body
    );
  }
  updateKyc(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.v2apiUrl}admin/updateKycDetails`,
      body
    );
  }
  updateResetKyc(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.v2apiUrl}kyc/resetKYC`,
      body
    );
  }
  
  getuserbalance(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/users/balancedetails`,
      body
    );
  }
  getStakeBalance(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/users/stakeBalanceDetails`,
      body
    );
  }
  getP2PBalance(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/users/p2pBalanceDetails`,
      body
    );
  }
  getusertradehistory(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/users/tradehistorydetails`,
      body
    );
  }
  userDetailsRemoved(body: any):Observable<any> {
    return this.httpClient.post<any>(
      `${environment.v2apiUrl}admin/userDetailsRemoved`,
      body
    );
  }
  getuserreferralhistory(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/users/referreduserdetails`,
      body
    );
  }
  getuserreferralcommision(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/users/getReferralData`,
      body
    );
  }
  updateSuspend(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.v2apiUrl}admin/updateSuspend`,
      body
    );
  }
  userEmailUpdation(body: any):Observable<any> {
    return this.httpClient.post<any>(
      `${environment.v2apiUrl}admin/userEmailUpdation`,
      body
    );
  }
  // getUserTotal(body: any): Observable<any> {
  //   return this.httpClient.post<any>(
  //     `${environment.apiUrl}admin/users/userTotal`,
  //     body
  //   );
  // }
}