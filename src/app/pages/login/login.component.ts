import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  login: string;

  password: string;

  isAdmin: boolean;

  message: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }


  getLogin () {

    let response = this.loginService.getAuthentication(this.login, this.password);
    response.subscribe(data=>console.log(data))


  }

}
