import { Address } from '../address';

export interface BuyerCreateAddressIn {
  buyerId: number;
  address: Address;
}

export interface BuyerUpdateRepresentativeIn {
  buyerId: number;
  id: number;
}

export interface BuyerDeleteIn {
  buyerId: number;
  id: number;
}
