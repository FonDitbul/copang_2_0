import { BuyerAddress } from './buyerAddress';
import { BuyerCreateAddressIn, BuyerCreateCardIn, BuyerDeleteIn, BuyerUpdateRepresentativeIn } from './port/buyerAccount.in';
import { BuyerCard } from './buyerCard';

export interface IBuyerAccountService {
  getAddressArray(buyerId: number): Promise<BuyerAddress[]>;
  createAddress(createAddressIn: BuyerCreateAddressIn): Promise<void>;
  updateRepresentativeAddress(updateAddressIn: BuyerUpdateRepresentativeIn): Promise<void>;
  deleteAddress(deleteAddressIn: BuyerDeleteIn): Promise<void>;
  getCardArray(buyerId: number): Promise<BuyerCard[]>;
  createCard(createCardIn: BuyerCreateCardIn): Promise<void>;
}
