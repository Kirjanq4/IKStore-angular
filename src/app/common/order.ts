import {OrderItem} from './order-item';

export class Order {

  id:number;

  totalPrice: number;

  totalQuantity: number;

  deliveryAddress: string;

  dateCreated: string;

  orderItems: OrderItem [] = [];
}
