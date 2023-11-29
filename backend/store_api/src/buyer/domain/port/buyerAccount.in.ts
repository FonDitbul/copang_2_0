import { Address } from '../address';
import { Card } from '../card';
import { BuyerAddress } from '../buyerAddress';
import { BuyerCard } from '../buyerCard';

// address
export type BuyerAddressBuyerIdIn = BuyerAddress['buyerId'];

export type BuyerCreateAddressIn = Pick<BuyerAddress, 'buyerId'> & { readonly address: Address };

export type BuyerUpdateRepresentativeAddressIn = Pick<BuyerAddress, 'id' | 'buyerId'>;

export type BuyerDeleteAddressIn = Pick<BuyerAddress, 'id' | 'buyerId'>;

// card
export type BuyerCardBuyerIdIn = BuyerCard['buyerId'];

export type BuyerCreateCardIn = Pick<BuyerCard, 'buyerId'> & { readonly card: Card };

export type BuyerUpdateRepresentativeCardIn = Pick<BuyerCard, 'id' | 'buyerId'>;

export type BuyerDeleteCardIn = Pick<BuyerCard, 'id' | 'buyerId'>;
