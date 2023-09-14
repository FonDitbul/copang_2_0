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

export interface BuyerDeleteIn {
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
