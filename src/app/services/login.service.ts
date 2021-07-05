import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginResponse} from '../common/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) { }


  getAuthentication (username: string, password: string) {

    const headers = new HttpHeaders({Authorization: 'Basic ' +btoa(username+":"+password)});
   return this.httpClient.get<LoginResponse>(this.baseUrl, {headers, responseType: 'json'})

  }


}
