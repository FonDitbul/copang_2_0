import { BuyerAddress } from './buyerAddress';
import { BuyerCreateAddressOut } from './port/buyerAccount.out';

export interface IBuyerAddressRepository {
  getOneById(id: BuyerAddress['id']): Promise<BuyerAddress>;
  getAllAddressByBuyerId(buyerId: BuyerAddress['buyerId']): Promise<BuyerAddress[]>;
  createAddress(createAddressOut: BuyerCreateAddressOut): Promise<void>;
  updateIsRepresentativeAddressById(id: BuyerAddress['id']): Promise<void>;
  updatesIsNotRepresentativeAddressByBuyerId(buyerId: BuyerAddress['buyerId']): Promise<void>;
  deleteAddressById(id: BuyerAddress['id']): Promise<void>;
}
