import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {LoginService} from './login.service';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private productsOfCategoryBase = 'http://localhost:8080/api/products'

  constructor(private http: HttpClient, private authService: LoginService) {

  }

  public findAll(): Observable<Product[]> {

    const headers = new HttpHeaders().set("Authorization", "Bearer "+this.authService.getToken())
    return this.http.get<Product[]>(this.baseUrl, {headers, responseType:'json'});
  }

  public findProductsInCategory (categoryId): Observable<Product[]> {

    const headers = new HttpHeaders().set("Authorization", "Bearer "+this.authService.getToken());
    const url = `${this.productsOfCategoryBase}/${categoryId}`;
    return this.http.get<Product[]>(url, {headers, responseType:'json'});

  }

  public addProductToCategory (product: Product) {

    const headers = new HttpHeaders().set("Authorization", "Bearer "+this.authService.getToken());
    return this.http.post<Product>(this.baseUrl,product,{headers, responseType: 'json'})


  }


}
