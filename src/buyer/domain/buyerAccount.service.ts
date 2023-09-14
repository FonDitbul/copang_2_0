import { BuyerAddress } from './buyerAddress';
import { BuyerCreateAddressIn, BuyerDeleteIn, BuyerUpdateRepresentativeIn } from './port/buyerAddress.in';
import { BuyerCard } from './buyerCard';

export interface IBuyerAccountService {
  getAddressArray(buyerId: number): Promise<BuyerAddress[]>;
  createAddress(createAddressIn: BuyerCreateAddressIn): Promise<void>;
  updateRepresentativeAddress(updateAddressIn: BuyerUpdateRepresentativeIn): Promise<void>;
  deleteAddress(deleteAddressIn: BuyerDeleteIn): Promise<void>;
  getCardArray(buyerId: number): Promise<BuyerCard[]>;
}
