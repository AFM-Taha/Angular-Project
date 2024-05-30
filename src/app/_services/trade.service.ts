import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TradeHistoryTblApiResponse, OrderHistoryTblApiResponse ,OrderHistoryTdsTblApiResponse} from '../_models/trade';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private httpClient: HttpClient) { }

  getTradeHistory(body: any): Observable<TradeHistoryTblApiResponse> {
      return this.httpClient.post<TradeHistoryTblApiResponse>(
        `${environment.apiUrl}trade/getTradeHistory`,
        body
      );
  }
  getOrderHistory(body: any): Observable<OrderHistoryTblApiResponse> {
    return this.httpClient.post<OrderHistoryTblApiResponse>(
      `${environment.apiUrl}trade/getOrderHistory`,
      body
    );
  }
  getOrderTradeTDSHistory(body: any): Observable<OrderHistoryTdsTblApiResponse> {
    return this.httpClient.post<OrderHistoryTdsTblApiResponse>(
      `${environment.apiUrl}trade/getOrderTradeTDSHistory`,
      body
    );
  }
}