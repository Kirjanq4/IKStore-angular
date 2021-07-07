import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {LoginService} from './login.service';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient, private authService: LoginService) {

  }

  public findAll(): Observable<Product[]> {

    const headers = new HttpHeaders().set("Authorization", "Bearer "+this.authService.getToken())
    return this.http.get<Product[]>(this.productsUrl, {headers, responseType:'json'});
  }


}
