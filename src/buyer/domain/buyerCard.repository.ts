import { BuyerCard } from './buyerCard';
import { BuyerCreateCardOut } from './port/buyerAccount.out';

export interface IBuyerCardRepository {
  getAllByBuyerId(buyerId: number): Promise<BuyerCard[]>;
  create(createCardOut: BuyerCreateCardOut): Promise<void>;
}
