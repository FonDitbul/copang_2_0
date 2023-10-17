import { BuyerCard } from './buyerCard';
import { BuyerCreateCardOut } from './port/buyerAccount.out';

export interface IBuyerCardRepository {
  getOneById(id: BuyerCard['id']): Promise<BuyerCard>;
  getAllByBuyerId(buyerId: BuyerCard['buyerId']): Promise<BuyerCard[]>;
  create(createCardOut: BuyerCreateCardOut): Promise<void>;
  updateIsRepresentativeById(id: BuyerCard['id']): Promise<void>;
  updatesIsNotRepresentativeByBuyerId(buyerId: BuyerCard['buyerId']): Promise<void>;
  deleteById(id: BuyerCard['id']): Promise<void>;
}
