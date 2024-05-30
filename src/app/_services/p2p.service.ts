import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, AuthResponse } from '../_models/auth';
import { P2PPairsApiResponse } from '../_models/p2p-pairs';
import { P2PPaymentTblApiResponse } from '../_models/p2p-payment';
import { ApiResponse } from '../_models/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class P2PService {
    constructor(private httpClient: HttpClient) {}
    getP2PPairsTblDetailsfilter(body): Observable<P2PPairsApiResponse> {
        return this.httpClient.post<P2PPairsApiResponse>(
          `${environment.apiUrl}p2p/getPairsfilter`,
          body
        );
      }
      getPairsTblDetails(): Observable<P2PPairsApiResponse> {
        return this.httpClient.get<P2PPairsApiResponse>(
          `${environment.apiUrl}p2p/getPairs`
        );
      }
      addPairs(body): Observable<P2PPairsApiResponse> {
        return this.httpClient.post<P2PPairsApiResponse>(
          `${environment.apiUrl}p2p/addPairs`,
          body
        );
      }
      updatePairs(body): Observable<P2PPairsApiResponse> {
        return this.httpClient.post<P2PPairsApiResponse>(
          `${environment.apiUrl}p2p/updatePairs`,
          body
        );
      }
      getP2PFaqTblDetailsfilter(body): Observable<P2PPairsApiResponse> {
        return this.httpClient.post<P2PPairsApiResponse>(
          `${environment.apiUrl}p2p/getFaq`,
          body
        );
      }
      addFaq(body): Observable<P2PPairsApiResponse> {
        return this.httpClient.post<P2PPairsApiResponse>(
          `${environment.apiUrl}p2p/addFaq`,
          body
        );
      }
      updateFaq(body): Observable<P2PPairsApiResponse> {
        return this.httpClient.post<P2PPairsApiResponse>(
          `${environment.apiUrl}p2p/updateFaq`,
          body
        );
      }
      getP2PPaymentTblDetails(body): Observable<P2PPaymentTblApiResponse> {
        return this.httpClient.post<P2PPaymentTblApiResponse>(
          `${environment.v2apiUrl}admin/getP2PPaymentDetails`,
          body
        );
      }
      updateP2PPaymentStatus(body): Observable<P2PPaymentTblApiResponse> {
        return this.httpClient.post<P2PPaymentTblApiResponse>(
          `${environment.v2apiUrl}admin/updateP2PPaymentStatus`,
          body
        );
      }
      addBankPayment(body): Observable<P2PPaymentTblApiResponse> {
        return this.httpClient.post<P2PPaymentTblApiResponse>(
          `${environment.v2apiUrl}admin/addBankPayment`,
          body
        );
      }
}