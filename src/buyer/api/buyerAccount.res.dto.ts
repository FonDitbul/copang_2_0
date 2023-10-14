import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCard } from '../domain/buyerCard';

export class BuyerAccountAddressRes {
  readonly buyerAddresses: BuyerAddress[];
}

export class BuyerAccountCardRes {
  readonly buyerCards: BuyerCard[];
}
