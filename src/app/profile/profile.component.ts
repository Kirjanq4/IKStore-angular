import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Order} from '../common/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  private _orders: Order [] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.userService.getUserOrders(this.router.url.split('profile/')[1]).subscribe(data=>{
      this._orders = data;
      console.log(this.orders)
    })

  }


  get orders(): Order[] {
    return this._orders;
  }
}
