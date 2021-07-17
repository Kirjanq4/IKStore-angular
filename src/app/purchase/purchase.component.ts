import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Purchase } from '../common/purchase';
import { PurchaseService } from '../services/purchase.service';
import { OrderItem } from '../common/order-item';
import { PurchaseResponse } from '../common/purchase-response';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {

  purchase: Purchase = new Purchase();

  purchaseResponse: PurchaseResponse = new PurchaseResponse();

  orderItem: OrderItem = new OrderItem();

  message: string;

  items = this.cartService.getItems();

  address: string;

  constructor(
    private cartService: CartService,
    private purchaseService: PurchaseService,

  ) {}

  ngOnInit(): void {


  }

  totalPrice = this.items.reduce((prev, cur) => prev + cur.price, 0);

  sendPurchase() {
    this.purchase.totalPrice = this.totalPrice;
    this.purchase.totalQty = this.items.length;
    this.purchase.shippingAddress = this.address;

    this.items.map((item) => {
      let arrItem = new OrderItem();
      arrItem.productId = item.id;
      arrItem.quantity = 1;
      arrItem.unitPrice = item.price;

      this.purchase.orderItems.push(arrItem);
    });

    console.log(this.purchase);

    this.purchaseService.setPurchase(this.purchase).subscribe(data=>{
      this.purchaseResponse = data;
      alert(this.purchaseResponse.message);
    });
    this.cartService.clearCart();
  }
}
