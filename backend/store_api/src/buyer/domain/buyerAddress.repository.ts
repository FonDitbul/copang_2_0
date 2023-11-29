import { BuyerAddress } from './buyerAddress';
import { BuyerAddressBuyerIdOut, BuyerAddressIdOut, BuyerCreateAddressOut } from './port/buyerAccount.out';

export interface IBuyerAddressRepository {
  getOneById(id: BuyerAddressIdOut): Promise<BuyerAddress>;
  getAllAddressByBuyerId(buyerId: BuyerAddressBuyerIdOut): Promise<BuyerAddress[]>;
  createAddress(createAddressOut: BuyerCreateAddressOut): Promise<void>;
  updateIsRepresentativeAddressById(id: BuyerAddressIdOut): Promise<void>;
  updatesIsNotRepresentativeAddressByBuyerId(buyerId: BuyerAddressBuyerIdOut): Promise<void>;
  deleteAddressById(id: BuyerAddressIdOut): Promise<void>;
}
