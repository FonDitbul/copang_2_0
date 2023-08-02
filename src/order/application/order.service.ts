import { Injectable } from '@nestjs/common';
import { IOrderService } from '../domain/order.service';
import { OrderCard } from '../domain/orderCard';
import { OrderBuyProduct } from '../domain/orderBuyProduct';

@Injectable()
export class OrderService implements IOrderService {
  buyProduct(card: OrderCard, address: string, buyProduct: OrderBuyProduct[]): Promise<boolean> {
    return Promise.resolve(false);
  }
}
