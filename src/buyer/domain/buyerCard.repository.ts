import { BuyerCard } from './buyerCard';
import { BuyerCreateCardOut } from './port/buyerAccount.out';

export interface IBuyerCardRepository {
  getOneById(id: number): Promise<BuyerCard>;
  getAllByBuyerId(buyerId: number): Promise<BuyerCard[]>;
  create(createCardOut: BuyerCreateCardOut): Promise<void>;
  updateIsRepresentativeById(id: number): Promise<void>;
  updatesIsNotRepresentativeByBuyerId(buyerId: number): Promise<void>;
}
