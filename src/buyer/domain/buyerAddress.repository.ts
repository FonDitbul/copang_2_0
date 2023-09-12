import { BuyerAddress } from './buyerAddress';
import { BuyerCreateAddressOut } from './port/buyerAddress.out';

export interface IBuyerAddressRepository {
  getAllAddressByBuyerId(buyerId: number): Promise<BuyerAddress[]>;
  createAddress(createAddressOut: BuyerCreateAddressOut): Promise<void>;
}
