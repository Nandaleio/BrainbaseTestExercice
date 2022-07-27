import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CryptoOpenClose } from '../models/CryptoOpenClose';

@Injectable({
  providedIn: 'root'
})
export class PolygonService {

  constructor(private http: HttpClient) { }

  getOpenClose(crypto:string, currency: string, date: string){
    return this.http.get<CryptoOpenClose>(environment.apiBaseUrl+`/open-close/crypto/${crypto}/${currency}/${date}`);
  }
}
