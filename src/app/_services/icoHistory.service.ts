import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IcoHistoryTblApiResponse } from '../_models/ico-history';

@Injectable({
  providedIn: 'root'
})
export class IcoHistoryService {

  constructor(private httpClient: HttpClient) { }

  getIcoTblDetails(body: any): Observable<IcoHistoryTblApiResponse> {
    return this.httpClient.post<IcoHistoryTblApiResponse>(
      `${environment.apiUrl}admin/ico/getIcoHistoryList`,
      body
    );
  }
}
