import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;

  authenticated: boolean = false;

  token: string;

  items: number;

  private _userName:string;

  private _userId: number;

  constructor(
    private authService: LoginService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.authentication.subscribe((data) => {
      this.token = data;
      this._userName = this.authService.getUserName();
      this._userId = this.authService.getUserId();
      this.authenticated = !!this.token;
      console.log('VALUE ' + data);
    });
  }

  ngDoCheck() {
    this.getCartItems();
  }

  logout() {
    this.authService.logout();
  }

  getCartItems() {
    this.items = this.cartService.getItems().length;
    return this.items;
  }


  get userName(): string {
    return this._userName;
  }


  get userId(): number {
    return this._userId;
  }
}
