import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.sass'],
})
export class PurchaseComponent implements OnInit {
  items = this.cartService.getItems();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  getTotalPrice() {}
  totalPrice = this.items.reduce((prev, cur) => prev + cur.price, 0);
}
