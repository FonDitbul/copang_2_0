import { BuyerAddress } from './buyerAddress';
import { BuyerCreateAddressIn } from './port/buyerAddress.in';

export interface IBuyerAccountService {
  getAddressArray(buyerId: number): Promise<BuyerAddress[]>;
  createAddress(createAddressIn: BuyerCreateAddressIn): Promise<void>;
}
