import {OrderItem} from './order-item';

export class Purchase {
  deliveryAddress: string;
  totalPrice: number;
  totalQuantity: number;
  orderItems: OrderItem [] = []
}
