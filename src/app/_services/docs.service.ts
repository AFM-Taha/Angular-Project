import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocsTblApiResponse } from '../_models/docs';
import { ApiResponse } from '../_models/core';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  constructor(private httpClient: HttpClient) { }

  getDocsTblDetails(): Observable<DocsTblApiResponse> {
    return this.httpClient.get<DocsTblApiResponse>(
      `${environment.apiUrl}admin/getDocs`
    );
  }
  getDocsById(body): Observable<DocsTblApiResponse> {
    return this.httpClient.post<DocsTblApiResponse>(
      `${environment.apiUrl}admin/getDocsById`,
      body
    );
  }
  addDocs(body): Observable<DocsTblApiResponse> {
    return this.httpClient.post<DocsTblApiResponse>(
      `${environment.apiUrl}admin/addDocs`,
      body
    );
  }
  updateDocs(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/updateDocs`,
      body
    );
  }
  deleteDocs(body): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      `${environment.apiUrl}admin/deleteDocs`,
      body
    );
  }
}
