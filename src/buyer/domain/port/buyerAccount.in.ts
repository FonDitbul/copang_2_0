import { Address } from '../address';
import { Card } from '../card';

export interface BuyerCreateAddressIn {
  buyerId: number;
  address: Address;
}

export interface BuyerUpdateRepresentativeAddressIn {
  buyerId: number;
  id: number;
}

export interface BuyerDeleteAddressIn {
  buyerId: number;
  id: number;
}

export interface BuyerCreateCardIn {
  buyerId: number;
  card: Card;
}

export interface BuyerUpdateRepresentativeCardIn {
  buyerId: number;
  id: number;
}

export interface BuyerDeleteCardIn {
  buyerId: number;
  id: number;
}
