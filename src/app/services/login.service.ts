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

  private headers;

  _authToken: string;

  authentication: Subject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) { }


  public getAuthenticationToken (request) {

   return this.httpClient.post<LoginResponse>(this.baseUrl, request, { responseType: 'json'});

  }

  logout() {
    this.setToken(null);
    this.checkAuthentication();
    return this.httpClient.get(this.logoutUrl);
  }

 getToken(): string {
    return this._authToken;
  }

  setToken(value: string) {
    this._authToken = value;
    //save to session
  }

  checkAuthentication () {

    this.authentication.next(this.getToken());
  }
}
