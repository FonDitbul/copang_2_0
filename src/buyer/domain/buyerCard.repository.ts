import { BuyerCard } from './buyerCard';

export interface IBuyerCardRepository {
  getAllByBuyerId(buyerId: number): Promise<BuyerCard[]>;
}
