import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, AuthResponse } from '../_models/auth';
import { P2PSettings } from '../_models/p2psettings';
import { ApiResponse } from '../_models/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class p2pSettingsService {
    constructor(private httpClient: HttpClient) {}
    UpdateP2PSettings(body): Observable<P2PSettings> {
        return this.httpClient.post<P2PSettings>(
          `${environment.apiUrl}admin/p2p/UpdateP2PSettings`,
          body
        );
      }
      getP2PSettings(): Observable<P2PSettings> {
      return this.httpClient.get<P2PSettings>(
        `${environment.apiUrl}admin/p2p/getP2PSettings`
      );
    }
}