import { BuyerAddress } from './buyerAddress';
import { BuyerCreateAddressOut } from './port/buyerAccount.out';

export interface IBuyerAddressRepository {
  getOneById(id: number): Promise<BuyerAddress>;
  getAllAddressByBuyerId(buyerId: number): Promise<BuyerAddress[]>;
  createAddress(createAddressOut: BuyerCreateAddressOut): Promise<void>;
  updateIsRepresentativeAddressById(id: number): Promise<void>;
  updatesIsNotRepresentativeAddressByBuyerId(buyerId: number): Promise<void>;
  deleteAddressById(id: number): Promise<void>;
}
