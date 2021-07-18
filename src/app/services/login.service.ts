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
    localStorage.removeItem('userId')
    this.setToken('','','');
    this.httpClient.get(this.logoutUrl);
  }

 getToken(): string {
    return localStorage.getItem('token');
  }

  getUserName(): string {
    return localStorage.getItem('username')
  }


  getUserId(): number {
    return parseInt(localStorage.getItem('userId'));
  }

  setToken(value: string, username:string, userId:string) {
    localStorage.setItem('token',value);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    this.authentication.next(this.getToken());
    //save to session
  }


}
