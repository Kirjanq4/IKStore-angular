import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginResponse} from '../common/login-response';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/auth';

  private logoutUrl = 'http://localhost:8080/logout';

  authentication: Subject<string> = new BehaviorSubject<string>(this.getToken());

  constructor(private httpClient: HttpClient) { }


  public getAuthenticationToken (request) {

   return this.httpClient.post<LoginResponse>(this.baseUrl, request, { responseType: 'json'});

  }

  logout() {
    localStorage.removeItem('token')
    this.setToken('');
    this.httpClient.get(this.logoutUrl);
  }

 getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(value: string) {
    localStorage.setItem('token',value);
    this.authentication.next(this.getToken());
    //save to session
  }


}
