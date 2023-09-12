import { Address } from '../address';

export interface BuyerCreateAddressIn {
  buyerId: number;
  address: Address;
}

export interface BuyerUpdateRepresentativeIn {
  buyerId: number;
  id: number;
}
