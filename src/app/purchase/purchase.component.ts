import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';
import {Purchase} from '../common/purchase';
import {PurchaseService} from '../services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.sass'],
})
export class PurchaseComponent implements OnInit {


  purchase: Purchase = new Purchase();

  message: string;





  items = this.cartService.getItems();

  constructor(private cartService: CartService, private purchaseService: PurchaseService) {}

  ngOnInit(): void {}

  getTotalPrice() {}
  totalPrice = this.items.reduce((prev, cur) => prev + cur.price, 0);
}

