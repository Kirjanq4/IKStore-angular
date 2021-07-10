import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Purchase } from '../common/purchase';
import { PurchaseService } from '../services/purchase.service';
import { OrderItem } from '../common/order-item';
import { PurchaseResponse } from '../common/purchase-response';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  purchase: Purchase = new Purchase();

  purchaseRespone: PurchaseResponse = new PurchaseResponse();

  orderItem: OrderItem = new OrderItem();

  message: string;

  items = this.cartService.getItems();

  address: string = '';

  constructor(
    private cartService: CartService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {}

  totalPrice = this.items.reduce((prev, cur) => prev + cur.price, 0);

  sendPurchase() {
    this.purchase.totalPrice = this.totalPrice;
    this.purchase.totalQuantity = this.items.length;
    this.purchase.deliveryAddress = this.address;

    this.items.map((item) => {
      let arr = new OrderItem();
      arr.productId = item.id;
      arr.quantity = 1;
      arr.unitPrice = item.price;

      this.purchase.orderItems.push(arr);
    });

    console.log(this.purchase);
    this.purchaseRespone.message = 'Thank You';
    alert(this.purchaseRespone.message);

    this.purchaseService.setPurchase(this.purchase);
  }
}
