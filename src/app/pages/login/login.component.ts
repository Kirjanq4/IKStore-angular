import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

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

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }


  getLogin (form) {

    if(this.validateForm(form)==='invalid'){
      return;
    }

    let response = this.loginService.getAuthentication(this.login, this.password);
    response.subscribe(data=>{
      this.message = data.message;
      this.isAdmin = data.admin;
      if(this.isAdmin){
        this.router.navigate(["/admin"])
      }
      else {
        this.router.navigate(["/products"])
      }
    },()=>{
      this.message = "Wrong username or password"
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

    if(this.login === undefined || this.login.length<4){
      return 'invalid';
    }
    if(this.password === undefined || this.password.length<4){
      return 'invalid';
    }
  }

}
