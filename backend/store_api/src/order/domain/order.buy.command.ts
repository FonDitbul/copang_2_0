import { OrderBuyIn } from './port/order.in';

export class OrderBuyCommand {
  constructor(public readonly orderBuyIn: OrderBuyIn) {}
}
