import { BuyerAddress } from './buyerAddress';

export interface IBuyerAccountService {
  getAddressArray(buyerId: number): Promise<BuyerAddress[]>;
}
