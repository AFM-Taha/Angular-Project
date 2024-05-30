import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtService } from 'src/app/_services/core/jwt.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SidebarService {
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  toggle(status: boolean) {
    return this.sideNavToggleSubject.next(status);
  }

  getMenu(): Observable<[]> {
    return this.httpClient.get<[]>(`${environment.apiUrl}admin/menu/`);
  }
}
