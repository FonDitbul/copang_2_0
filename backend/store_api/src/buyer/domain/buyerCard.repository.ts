import { BuyerCard } from './buyerCard';
import { BuyerCardBuyerIdOut, BuyerCardIdOut, BuyerCreateCardOut } from './port/buyerAccount.out';

export interface IBuyerCardRepository {
  getOneById(id: BuyerCardIdOut): Promise<BuyerCard>;
  getAllByBuyerId(buyerId: BuyerCardBuyerIdOut): Promise<BuyerCard[]>;
  create(createCardOut: BuyerCreateCardOut): Promise<void>;
  updateIsRepresentativeById(id: BuyerCardIdOut): Promise<void>;
  updatesIsNotRepresentativeByBuyerId(buyerId: BuyerCardBuyerIdOut): Promise<void>;
  deleteById(id: BuyerCardIdOut): Promise<void>;
}
