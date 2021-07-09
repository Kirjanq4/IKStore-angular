import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import {LoginService} from './login.service';
import {PurchaseResponse} from '../common/purchase-response';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private ordersUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private http: HttpClient, private authService: LoginService) {}

  public setPurchase(purchase: Purchase){

    const headers = new HttpHeaders().set("Authorization", "Bearer "+this.authService.getToken());
    return this.http.post<PurchaseResponse>(this.ordersUrl, purchase, {headers, responseType: 'json'});
  }
}
