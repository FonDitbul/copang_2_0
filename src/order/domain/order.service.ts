import { OrderCard } from '../domain/orderCard';
import { OrderBuyProduct } from '../domain/orderBuyProduct';

export interface IOrderService {
  buyProduct(card: OrderCard, address: string, buyProduct: OrderBuyProduct[]): Promise<boolean>;
}
