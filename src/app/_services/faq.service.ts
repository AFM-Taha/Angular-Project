import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, AuthResponse } from '../_models/auth';
import { P2PPairsApiResponse } from '../_models/p2p-pairs';
import { ApiResponse } from '../_models/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
    constructor(private httpClient: HttpClient) {}
      getFaqTblDetailsfilter(): Observable<P2PPairsApiResponse> {
        return this.httpClient.get<P2PPairsApiResponse>(
          `${environment.apiUrl}p2p/getFaqDetails`
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
}