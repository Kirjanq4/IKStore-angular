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
    localStorage.removeItem('username')
    this.setToken('','');
    this.httpClient.get(this.logoutUrl);
  }

 getToken(): string {
    return localStorage.getItem('token');
  }

  getUserName(): string {
    return localStorage.getItem('username')
  }



  setToken(value: string, username:string) {
    localStorage.setItem('token',value);
    localStorage.setItem('username', username);
    this.authentication.next(this.getToken());
    //save to session
  }


}
