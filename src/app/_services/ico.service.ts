import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IcoTblApiResponse } from '../_models/ico';
import { ApiResponse } from '../_models/core';

@Injectable({
  providedIn: 'root'
})
export class IcoService {

  constructor(private httpClient: HttpClient) { }

  getIcoTblDetails(): Observable<IcoTblApiResponse> {
      return this.httpClient.get<IcoTblApiResponse>(
        `${environment.apiUrl}admin/ico/getIco`
      );
  }
  getIcoTblDetailsfilter(body): Observable<IcoTblApiResponse> {
    return this.httpClient.post<IcoTblApiResponse>(
      `${environment.apiUrl}admin/ico/getIcofilter`,
      body
    );
  }
  addIco(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/ico/addIco`,
      body
    );
  }
  getIcoById(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/ico/getIcoById`,
      body
    );
  }
  updateIco(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/ico/updateIco`,
      body
    );
  }
  getNextBackPage(pageNumber:any){
    return this.httpClient.get(`${environment.apiUrl}admin/ico/getIco?page=${pageNumber}`)
  }
}
