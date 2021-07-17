import {OrderItem} from './order-item';

export class Purchase {
  shippingAddress: string;
  totalPrice: number;
  totalQty: number;
  orderItems: OrderItem [] = []
}
