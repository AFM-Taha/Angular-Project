import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransactionsTblApiResponse } from '../_models/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) { }

  getTransactionsTblDetails(body: any): Observable<TransactionsTblApiResponse> {
    return this.httpClient.post<TransactionsTblApiResponse>(
      `${environment.apiUrl}admin/transactions/getTransactions`,
      body
    );
  }

  getTransactionsDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/transactions/getTransactionsDetails`,
      body
    );
  }

  getTransactionsDetails1(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/futures-fund/get-details`,
      body
    );
  }
  getUserTransactionsDetails(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/transactions/getUserTransactionsDetails`,
      body
    );
  }
  updateTransactions(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/transactions/updateTransactions`,
      body
    );
  }
  updateNewStatusTransactions(body: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}admin/transactions/adminTrxnVerification`,
      body
    );
  }
  //   postTransactionsTblDetails(body: any): Observable<TransactionsTblApiResponse> {
  //     return this.httpClient.post<TransactionsTblApiResponse>(
  //       `${environment.apiUrl}admin/transactions/getTransactions?`,
  //       body
  //     );
  // }
}