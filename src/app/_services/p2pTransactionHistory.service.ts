import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { P2PTransactionTblApiResponse } from '../_models/p2p-transactiono-history';
import { ApiResponse } from '../_models/core';
@Injectable({
  providedIn: 'root'
})
export class P2PService {

  constructor(private httpClient: HttpClient) { }

  getp2pTransactionTblDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getallTransactions`,
      body
    );
  }
  getp2pTransactionHistoryDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getTransactionHistoryDetails`,
      body
    );
  }
  getp2pappealTblDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getallAppealDetails`,
      body
    );
  }
  getp2pAppealHistoryDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getp2pAppealHistoryDetails`,
      body
    );
  }
  getp2pReportHistoryDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getp2pReportHistoryDetails`,
      body
    );
  }
  p2ppaymentReceived(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/p2ppaymentReceived`,
      body
    );
  }
  p2pcancelAppeal(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/p2pcancelAppeal`,
      body
    );
  }
  p2pcancelOrder(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/p2pcancelOrder`,
      body
    );
  }
  getp2pReportTblApiResponse(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getp2pReportDetails`,
      body
    );
  }
  getp2pBlockedUserTblApiResponse(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getp2pBlockedUserstDetails`,
      body
    );
  }
  getp2pFeedbackTblApiResponse(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getp2pFeedbackDetails`,
      body
    );
  }
  getp2pFeedbackDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/getp2pFeedbackList`,
      body
    );
  }
  blockUnlockUser(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/p2p/blockUnlockUser`,
      body
    );
  }
  getp2pOrdersTblDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.v2apiUrl}admin/getallOrders`,
      body
    );
  }
  getp2pOrdersDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.v2apiUrl}admin/getordersDetails`,
      body
    );
  }
}
