import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private productsUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  public saveOrder(order: Purchase) {
    return this.http.post<Purchase>(this.productsUrl, order);
  }
}
