import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Master } from 'src/app/_models/core';
import {
  CountryLisResponse,
  ServiceProviderCategory,
} from 'src/app/_models/country';
import { ProductClausesPlaceholders } from 'src/app/_models/products';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private httpClient: HttpClient) {}

  getAge(birthday: any): number {
    const dob = new Date(birthday);
    const now = new Date();
    const timeDiff = Math.abs(Date.now() - dob.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
  }

  getLanguageArr(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(
      `${environment.apiUrl}master/languages`
    );
  }

  getDateFormatArr(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(
      `${environment.apiUrl}master/dateformat`
    );
  }

  getCountries(): Observable<CountryLisResponse> {
    return this.httpClient.get<CountryLisResponse>(
      `${environment.apiUrl}master/countrieslist`
    );
  }

  getMaritalStatus(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(
      `${environment.apiUrl}master/maritalstatus`
    );
  }

  getBusinessCountries(): Observable<CountryLisResponse> {
    return this.httpClient.get<CountryLisResponse>(
      `${environment.apiUrl}master/countries`
    );
  }

  getProductStatus(): Master[] {
    const returnArr: Master[] = [
      { id: 1, value: 'Enabled' },
      { id: 2, value: 'Disabled' },
    ];
    return returnArr;
  }

  getClausesConditions(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(
      `${environment.apiUrl}master/clausesconditions`
    );
  }

  getTransactionTypes(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(
      `${environment.apiUrl}master/transactioncategories`
    );
  }

  getExecutoTypes(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(
      `${environment.apiUrl}master/executortypes`
    );
  }

  getIdTypes(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(
      `${environment.apiUrl}master/idtypes`
    );
  }

  getRelationships(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(
      `${environment.apiUrl}master/relationships`
    );
  }

  getClausesPlaceholders(): Observable<ProductClausesPlaceholders[]> {
    return this.httpClient.get<ProductClausesPlaceholders[]>(
      `${environment.apiUrl}master/clausesplaceholders`
    );
  }

  getServiceProviderTypes(): Observable<ServiceProviderCategory[]> {
    return this.httpClient.get<ServiceProviderCategory[]>(
      `${environment.apiUrl}admin/master/digitalplaceholders`
    );
  }
}
