import { BuyerAddress } from './buyerAddress';
import { BuyerCreateAddressIn, BuyerDeleteIn, BuyerUpdateRepresentativeIn } from './port/buyerAddress.in';

export interface IBuyerAccountService {
  getAddressArray(buyerId: number): Promise<BuyerAddress[]>;
  createAddress(createAddressIn: BuyerCreateAddressIn): Promise<void>;
  updateRepresentativeAddress(updateAddressIn: BuyerUpdateRepresentativeIn): Promise<void>;
  deleteAddress(deleteAddressIn: BuyerDeleteIn): Promise<void>;
}
