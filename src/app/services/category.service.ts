import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';
import {Product} from '../common/product';
import {Observable} from 'rxjs';
import {Category} from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = "http://localhost:8080/api/categories"

  constructor(private http: HttpClient, private authService: LoginService) { }

  getCategories (): Observable<Category[]> {

    const headers = new HttpHeaders().set("Authorization", "Bearer "+this.authService.getToken());
    return this.http.get<Category[]>(this.categoriesUrl, {headers, responseType:'json'});

  }

}
