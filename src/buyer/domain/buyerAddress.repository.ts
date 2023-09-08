import { BuyerAddress } from './buyerAddress';

export interface IBuyerAddressRepository {
  getAllAddressByBuyerId(buyerId: number): Promise<BuyerAddress[]>;
}
