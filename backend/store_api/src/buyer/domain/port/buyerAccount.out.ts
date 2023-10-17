import { BuyerAddress } from '../buyerAddress';
import { BuyerCard } from '../buyerCard';

export interface BuyerCreateAddressOut {
  readonly buyerId: BuyerAddress['buyerId'];
  readonly address: BuyerAddress['address'];
}

export interface BuyerCreateCardOut {
  readonly buyerId: BuyerCard['buyerId'];
  readonly bankName: BuyerCard['bankName'];
  readonly cardType: BuyerCard['cardType'];
  readonly cardNumber: BuyerCard['cardNumber'];
  readonly validityPeriod: BuyerCard['validityPeriod'];
}
