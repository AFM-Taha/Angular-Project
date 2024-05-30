import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrencyTblApiResponse } from '../_models/currency';
import { PairsTblApiResponse } from '../_models/pairs';
import { ApiResponse } from '../_models/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  getCurrencyTblDetails(): Observable<CurrencyTblApiResponse> {
    return this.httpClient.get<CurrencyTblApiResponse>(
      `${environment.apiUrl}admin/currency/getCurrency`
    );
  }

  getCurrencyTblfilterDetails(body): Observable<CurrencyTblApiResponse> {
    return this.httpClient.post<CurrencyTblApiResponse>(
      `${environment.apiUrl}admin/currency/getCurrencyfilter`,
      body
    );
  }

  addCurrency(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/currency/addCurrency`,
      body
    );
  }
  getCurrencyById(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/currency/getCurrencyById`,
      body
    );
  }
  updateCurrency(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/currency/updateCurrency`,
      body
    );
  }
  getPairsTblDetails(): Observable<PairsTblApiResponse> {
    return this.httpClient.get<PairsTblApiResponse>(
      `${environment.apiUrl}admin/pairs/getPairs`
    );
  }
  getPairsTblDetailsfilter(body): Observable<PairsTblApiResponse> {
    return this.httpClient.post<PairsTblApiResponse>(
      `${environment.apiUrl}admin/pairs/getPairsfilter`,
      body
    );
  }
  addPairs(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/pairs/addPairs`,
      body
    );
  }
  updatePairs(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/pairs/updatePairs`,
      body
    );
  }

  postNextPage(pageNumber: any) {
    return this.httpClient.get(`${environment.apiUrl}admin/currency/getCurrency?page=${pageNumber}`)
  }
  postNextPairsPage(pageNumber: any) {
    return this.httpClient.get(`${environment.apiUrl}admin/pairs/getPairs?page=${pageNumber}`)
  }
  getDerivativesPairsDetailsfilter(body): Observable<PairsTblApiResponse> {
    return this.httpClient.post<PairsTblApiResponse>(
      `${environment.apiUrl}admin/pairs/getDerivativesPairsfilter`,
      body
    );
  }
  addDerivativesPairs(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/pairs/addDerivativesPairs`,
      body
    );
  }
  updateDerivativesPairs(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/pairs/updateDerivativesPairs`,
      body
    );
  }
}
