import { OrderCard } from '../orderCard';
import { OrderBuyProduct } from '../orderBuyProduct';

export interface OrderBuyIn {
  buyerId: number;
  card: OrderCard;
  address: string;
  buyProduct: OrderBuyProduct[];
}

export interface OrderPaymentRequestIn {
  paymentKey: string;
}
