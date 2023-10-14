import { BuyerAddress } from './buyerAddress';
import {
  BuyerCreateAddressIn,
  BuyerCreateCardIn,
  BuyerDeleteAddressIn,
  BuyerDeleteCardIn,
  BuyerUpdateRepresentativeAddressIn,
  BuyerUpdateRepresentativeCardIn,
} from './port/buyerAccount.in';
import { BuyerCard } from './buyerCard';

export interface IBuyerAccountService {
  getAddressArray(buyerId: BuyerAddress['buyerId']): Promise<BuyerAddress[]>;
  createAddress(createAddressIn: BuyerCreateAddressIn): Promise<void>;
  updateRepresentativeAddress(updateAddressIn: BuyerUpdateRepresentativeAddressIn): Promise<void>;
  deleteAddress(deleteAddressIn: BuyerDeleteAddressIn): Promise<void>;
  getCardArray(buyerId: BuyerCard['buyerId']): Promise<BuyerCard[]>;
  createCard(createCardIn: BuyerCreateCardIn): Promise<void>;
  updateRepresentativeCard(updateCardIn: BuyerUpdateRepresentativeCardIn): Promise<void>;
  deleteCard(deleteCardIn: BuyerDeleteCardIn): Promise<void>;
}
