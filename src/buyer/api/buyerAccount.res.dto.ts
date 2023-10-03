import { BuyerAddress } from '../domain/buyerAddress';
import { BuyerCard } from '../domain/buyerCard';

export class BuyerAccountAddressRes {
  buyerAddresses: BuyerAddress[];
}

export class BuyerAccountCardRes {
  buyerCards: BuyerCard[];
}
