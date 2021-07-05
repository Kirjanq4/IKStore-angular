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

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }


  getLogin () {

    let response = this.loginService.getAuthentication(this.login, this.password);
    response.subscribe(data=>{
      this.message = data.message;
      this.isAdmin = data.admin;
      console.log(this.message, this.isAdmin)
      if(this.isAdmin){
        this.router.navigate(["/admin"])
      }
      else {
        this.router.navigate(["/products"])
      }
    })

  }


}
