import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FuturesUsdtMoveApiResponse } from '../_models/futures-usdt-move';

@Injectable({
  providedIn: 'root'
})
export class FuturesUsdtMoveService {

  constructor(private httpClient: HttpClient) { }

  getFuturesUsdtMove(): Observable<FuturesUsdtMoveApiResponse> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}futures-fund/get-details`,
    );
  }
  getFuturesUsdtMoveDetails(id: number): Observable<FuturesUsdtMoveApiResponse> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}futures-fund/get-by-id?type=id&id=${id}`,
    );
  }

  updateFuturesUsdtMoveStatus(body: any): Observable<any> {
    console.log('body', body);
    console.log('url', `${environment.apiUrl}futures-fund/fund-move`);
    return this.httpClient.post<any>(
      `${environment.apiUrl}futures-fund/fund-move`,
      body
    );

  }
}

// updateNewStatusTransactions(body: any): Observable < any > {
//   return this.httpClient.post<any>(
//     `${environment.apiUrl}admin/transactions/adminTrxnVerification`,
//     body
//   );
// }