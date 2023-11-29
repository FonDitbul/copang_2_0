import { BuyerAddress } from '../buyerAddress';
import { BuyerCard } from '../buyerCard';

// address
export type BuyerAddressIdOut = BuyerAddress['id'];

export type BuyerAddressBuyerIdOut = BuyerAddress['buyerId'];

export type BuyerCreateAddressOut = Pick<BuyerAddress, 'buyerId' | 'address'>;

// card
export type BuyerCreateCardOut = Pick<BuyerCard, 'buyerId' | 'bankName' | 'cardType' | 'cardNumber' | 'validityPeriod'>;

export type BuyerCardIdOut = BuyerCard['id'];

export type BuyerCardBuyerIdOut = BuyerCard['buyerId'];
