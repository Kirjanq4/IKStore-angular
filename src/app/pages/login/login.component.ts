import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {AuthRequest} from '../../common/auth-request';

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

  timer: boolean;

  authRequest = new AuthRequest();

  authToken: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }


  getLogin (form) {

    if(this.validateForm(form)==='invalid'){
      return;
    }

    this.authRequest.login = this.login;
    this.authRequest.password = this.password;

    let response = this.loginService.getAuthenticationToken(this.authRequest);

    response.subscribe(data=>{
      this.message = data.message;
      this.isAdmin = data.admin;
      this.authToken = data.authToken;

      if(data.message === "Wrong username or password"){
        this.message = data.message;
        return;
      }

      this.loginService.setToken(this.authToken);

      this.loginService.checkAuthentication();

      if(this.isAdmin){
        this.router.navigate(["/admin"])
      }
      else {
        this.router.navigate(["/products"])
      }
    })

  }

  setTimer () {
    this.timer = true;
    setTimeout(()=>{
      this.timer = false;
    },3000)
  }


  validateForm (form) {

    form.controls.login.touched = true;
    form.controls.password.touched = true;

    if(!form.valid){
      return 'invalid';
    }
  }

}
