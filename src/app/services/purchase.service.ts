import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private ordersUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  public setPurchase(purchase: Purchase) {
    return this.http.post<Purchase>(this.ordersUrl, purchase);
  }
}
