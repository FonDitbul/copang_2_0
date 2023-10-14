import { Address } from '../address';
import { Card } from '../card';
import { BuyerAddress } from '../buyerAddress';

export interface BuyerCreateAddressIn {
  readonly buyerId: BuyerAddress['buyerId'];
  readonly address: Address;
}

export interface BuyerUpdateRepresentativeAddressIn {
  readonly id: BuyerAddress['id'];
  readonly buyerId: BuyerAddress['buyerId'];
}

export interface BuyerDeleteAddressIn {
  readonly id: BuyerAddress['id'];
  readonly buyerId: BuyerAddress['buyerId'];
}

export interface BuyerCreateCardIn {
  readonly buyerId: number;
  readonly card: Card;
}

export interface BuyerUpdateRepresentativeCardIn {
  readonly id: BuyerAddress['id'];
  readonly buyerId: BuyerAddress['buyerId'];
}

export interface BuyerDeleteCardIn {
  readonly id: BuyerAddress['id'];
  readonly buyerId: BuyerAddress['buyerId'];
}
