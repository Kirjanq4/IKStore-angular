import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {LoginService} from '../services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;

  authenticated: boolean = false;

  token: string;

  constructor(private authService: LoginService) {}

  ngOnInit(): void {

    this.authService.authentication.subscribe(data=>{

        this.token = data;
        if(this.token){
          this.authenticated = true;
        }
    })
    this.authService.checkAuthentication();

    }

    logout () {
      this.authService.logout();
      if(!this.token){
        this.authenticated = false;
      }


    }


}
