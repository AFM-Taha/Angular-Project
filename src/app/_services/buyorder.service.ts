import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuycryptoTblApiResponse } from '../_models/buycrypto';
@Injectable({
  providedIn: 'root'
})
export class BuyorderService {

  constructor(private httpClient: HttpClient) { }

  getBuycryptoTblDetails(body: any) {
    return this.httpClient.get(
      
      `${environment.apiUrl}buycrypto/buycryptoodrdersList`,
      body
    );
}

    getUserBuycryptoTblDetails(body: any) {
    return this.httpClient.post(
    
    `${environment.apiUrl}buycrypto/getbuyorderdetails`,
    body
  );
}
  updateUserStatus(body:any){
    
    return this.httpClient.post(
      `${environment.apiUrl}buycrypto/coins`,
      body
    )
  }

}
