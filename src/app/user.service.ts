import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './services/login.service';

import {Order} from './common/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/orders'

  constructor(private http: HttpClient, private authService: LoginService) { }



  getUserOrders(id) {
    const headers = new HttpHeaders().set("Authorization", "Bearer "+this.authService.getToken());
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Order[]>(url,{headers,responseType:'json'});
  }

}
